import { IsDate, IsNotEmpty } from 'class-validator';
import { IsCPF } from 'src/utils/validators/is-cpf.validator';

export class CreatePatientDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsCPF()
  cpf: string;

  @IsDate()
  birthDate: Date;
}
