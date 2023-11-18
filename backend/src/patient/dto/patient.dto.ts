import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsCPF } from 'src/utils/validators/is-cpf.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exist.validator';

export class CreatePatientDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @Transform((cpf) => cpf.value.replace(/[^\d]+/g, ''))
  @IsNotEmpty()
  @IsCPF()
  @Validate(IsNotExist, ['Patient'], {
    message: 'Esse paciente já existe.',
  })
  cpf: string;

  @IsDateString()
  birthDate: Date;
}

export class UpdatePatientDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsDateString()
  birthDate: Date;
}
