import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async register(dto: AuthRegisterDto): Promise<void> {
    return this.usersService.create({
      ...dto,
      email: dto.email,
    });
  }
}
