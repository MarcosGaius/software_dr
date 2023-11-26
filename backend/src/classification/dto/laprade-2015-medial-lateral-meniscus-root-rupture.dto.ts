import {
  LesionType,
  LesionVariation,
} from '../enums/laprade-2015-medial-lateral-meniscus-root-rupture.enum';
import { IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';

// Ruptura da Raiz Meniscal medial e lateral (LaPrade, 2015)

export class LaPrade2015MedialLateralMeniscusRootRuptureClassifitcationDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsEnum(LesionType)
  @IsNotEmpty()
  lesionType: LesionType;

  @ValidateIf((object) => object.lesionType === LesionType.Type2)
  @IsEnum(LesionVariation)
  @IsNotEmpty()
  lesionVariation: LesionVariation;
}
