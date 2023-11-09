import * as bcrypt from 'bcryptjs';
import ms from 'ms';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginResponseType } from './types/login-response.type';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly configService: ConfigService
  ) {}

  async register(dto: AuthRegisterDto): Promise<User> {
    return this.usersService.create(dto);
  }

  async validateLogin(loginDto: LoginDto): Promise<LoginResponseType> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'Senha ou email inválido',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'Senha ou email inválido',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  private async getTokensData(data: { id: User['id'] }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        }
      ),
      await this.jwtService.signAsync({
        secret: this.configService.getOrThrow('auth.refreshSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
          infer: true,
        }),
      }),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
