import {
  LesionMorphology,
  RelativePortion,
} from '../enums/nguyen-2014-morphology-meniscus-lesion.enum';
import { IsBoolean, IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';

// Tipos de Lesões Meniscal Quanto a Morfologia (Nguyen et al. 2014)

export class Nguyen2014MorphologyMeniscusLesionClassificationDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsEnum(LesionMorphology)
  @IsNotEmpty()
  morphology: LesionMorphology;

  @ValidateIf((obj) => obj.morphology === LesionMorphology.Horizontal)
  @IsBoolean()
  @IsNotEmpty()
  parameniscalCyst: boolean;

  @ValidateIf((obj) => obj.parameniscalCyst === true)
  @IsEnum(RelativePortion)
  @IsNotEmpty()
  relativePortion: RelativePortion;
}
