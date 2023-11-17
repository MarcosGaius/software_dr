import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(user: CreateUserDto) {
    return this.userRepository.save(
      this.userRepository.create({
        ...user,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    );
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.userRepository.findOne({
      where: fields,
    });
  }
}
