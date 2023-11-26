import { IsValidThaunatGreifLesionVariation } from 'src/utils/validators/classifications/thaunat-greif-lesion-variation.validator';
import {
  LesionType,
  LesionVariation,
} from '../enums/thaunat-greif-classification.enum';
import { IsEnum, IsNotEmpty, Validate } from 'class-validator';

// Classificação de Thaunat et al. Modificada por Greif et al.(2020)

export class ThaunatGreifClassificationDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsEnum(LesionType)
  @IsNotEmpty()
  lesionType: LesionType;

  @Validate(IsValidThaunatGreifLesionVariation)
  lesionVariation: LesionVariation;
}
