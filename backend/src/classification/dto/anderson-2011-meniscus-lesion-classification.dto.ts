import {
  Criteria,
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
  ValidateIf,
} from 'class-validator';

// Classificação das Lesões Meniscais (Anderson et al, 2011)

export class Anderson2011MeniscusLesionClassificationDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsEnum(Criteria)
  criteria: string;

  @ValidateIf((obj) => obj.criteria === Criteria.RegardingInjury)
  @IsNotEmpty()
  @IsEnum(LesionType)
  lesionType: LesionType;

  @ValidateIf((obj) => obj.criteria === Criteria.RegardingExtension)
  @IsEnum(LesionExtension)
  @IsNotEmpty()
  lesionExtension: LesionExtension;

  @ValidateIf((obj) => obj.criteria === Criteria.RegardingLocation)
  @IsEnum(LesionLocation)
  @IsNotEmpty()
  lesionLocation: LesionLocation;

  @ValidateIf((obj) => obj.criteria === Criteria.CenterToPoplitealHiatus)
  @IsNotEmpty()
  @IsBoolean()
  centerToPoplitealHiatus: boolean;

  @ValidateIf((obj) => obj.criteria === Criteria.RegardingPattern)
  @IsEnum(LesionPattern)
  @IsNotEmpty()
  lesionPattern: LesionPattern;

  @ValidateIf((obj) => obj.criteria === Criteria.RegardingTissue)
  @IsEnum(TissueQuality)
  @IsNotEmpty()
  tissueQuality: TissueQuality;

  @ValidateIf((obj) => obj.criteria === Criteria.RegardingLength)
  @IsNotEmpty()
  @IsNumber()
  lesionLength: number; // Em mm

  @ValidateIf((obj) => obj.criteria === Criteria.RegardingExcised)
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1)
  excisedQuantity: number; // Armazenar % em ponto flutuante
}
