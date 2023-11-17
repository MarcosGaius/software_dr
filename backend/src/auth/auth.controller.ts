import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseType } from './types/login-response.type';
import { RefreshDto } from './dto/refresh.dto';

// adicionar cookies

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: AuthRegisterDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public adminLogin(@Body() loginDTO: LoginDto): Promise<LoginResponseType> {
    return this.authService.validateLogin(loginDTO);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
