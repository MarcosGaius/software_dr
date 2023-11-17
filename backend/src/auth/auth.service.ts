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
import { AuthConfig } from 'src/config/config.type';

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

  async refresh(
    refreshToken: string
  ): Promise<Omit<LoginResponseType, 'user'>> {
    const invalidTokenError = new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        errors: {
          refreshToken: 'Token inválido',
        },
      },
      HttpStatus.BAD_REQUEST
    );

    if (!refreshToken) {
      throw invalidTokenError;
    }

    const { sub } = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: this.configService.get('auth.refreshSecret', {
          infer: true,
        }),
      })
      .catch(() => {
        throw invalidTokenError;
      });

    const user = await this.usersService.findOne({
      id: sub,
    });

    const {
      token,
      refreshToken: newRefreshToken,
      tokenExpires,
    } = await this.getTokensData({
      id: user.id,
    });

    return {
      token,
      refreshToken: newRefreshToken,
      tokenExpires,
    };
  }

  private async getTokensData(data: { id: User['id'] }) {
    const authConfig = this.configService.get('auth', {
      infer: true,
    }) as AuthConfig;

    const tokenExpiresIn = authConfig.expires;
    const tokenExpires = (Date.now() + ms(tokenExpiresIn)).toString();
    const refreshTokenExpiresIn = authConfig.refreshExpires;
    const refreshTokenExpires = (
      Date.now() + ms(refreshTokenExpiresIn)
    ).toString();

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          expires: tokenExpires,
        },
        {
          subject: String(data.id),
          secret: authConfig.secret,
          expiresIn: tokenExpiresIn,
        }
      ),
      await this.jwtService.signAsync(
        {
          expires: refreshTokenExpires,
        },
        {
          subject: String(data.id),
          secret: authConfig.refreshSecret,
          expiresIn: authConfig.refreshExpires,
        }
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
