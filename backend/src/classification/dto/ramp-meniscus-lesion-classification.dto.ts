import { LesionType } from '../enums/ramp-meniscal-lesion-classification.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

// Lesão Meniscal em Rampa(Thaunat et al, 2021)

export class RampMeniscusLesionClassificationDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsEnum(LesionType)
  @IsNotEmpty()
  lesionType: LesionType;
}
