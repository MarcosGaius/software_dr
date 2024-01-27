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

  @IsBoolean()
  @IsNotEmpty()
  horizontal: boolean;

  @IsBoolean()
  @IsNotEmpty()
  longitudinal: boolean;

  @IsBoolean()
  @IsNotEmpty()
  radial: boolean;

  @IsBoolean()
  @IsNotEmpty()
  root: boolean;

  @IsBoolean()
  @IsNotEmpty()
  displaced: boolean;

  @IsBoolean()
  @IsNotEmpty()
  complex: boolean;

  @IsBoolean()
  @IsNotEmpty()
  bucketHandle: boolean;

  @IsBoolean()
  @IsNotEmpty()
  fraying: boolean;

  @ValidateIf((obj) => obj.horizonal)
  @IsBoolean()
  @IsNotEmpty()
  parameniscalCyst: boolean;

  @ValidateIf((obj) => obj.parameniscalCyst === true)
  @IsEnum(RelativePortion)
  @IsNotEmpty()
  relativePortion: RelativePortion;
}
