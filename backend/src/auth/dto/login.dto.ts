import { IsNotEmpty, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class LoginDto {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
