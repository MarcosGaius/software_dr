import {
  LesionExtension,
  LesionLocation,
  LesionPattern,
  LesionType,
  TissueQuality,
} from '../enums/anderson-2011-meniscus-lesion-classification.enum';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
} from 'class-validator';

// Classificação das Lesões Meniscais (Anderson et al, 2011)

export class Anderson2011MeniscusLesionClassificationDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsEnum(LesionType)
  lesionType: LesionType;

  @IsEnum(LesionExtension)
  @IsNotEmpty()
  lesionExtension: LesionExtension;

  @IsEnum(LesionLocation)
  @IsNotEmpty()
  lesionLocation: LesionLocation;

  @IsNotEmpty()
  @IsBoolean()
  centerToPoplitealHiatus: boolean;

  @IsEnum(LesionPattern)
  @IsNotEmpty()
  lesionPattern: LesionPattern;

  @IsEnum(TissueQuality)
  @IsNotEmpty()
  tissueQuality: TissueQuality;

  @IsNotEmpty()
  @IsNumber()
  lesionLength: number; // Em mm

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1)
  excisedQuantity: number; // Armazenar % em ponto flutuante
}
