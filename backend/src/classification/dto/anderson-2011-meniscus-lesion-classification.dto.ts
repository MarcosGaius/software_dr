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
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

// Classificação das Lesões Meniscais (Anderson et al, 2011)

export class Anderson2011MeniscusLesionClassificationDto {
  constructor(data) {
    Object.assign(this, data);
  }

  // @IsNotEmpty()
  // @IsEnum(Criteria)
  // criteria: string;

  // @ValidateIf((obj) => obj.criteria === Criteria.RegardingInjury)
  // @IsNotEmpty()
  @IsOptional()
  @IsEnum(LesionType)
  lesionType: LesionType;

  // @ValidateIf((obj) => obj.criteria === Criteria.RegardingExtension)
  @IsOptional()
  @IsEnum(LesionExtension)
  // @IsNotEmpty()
  lesionExtension: LesionExtension;

  // @ValidateIf((obj) => obj.criteria === Criteria.RegardingLocation)
  @IsOptional()
  @IsEnum(LesionLocation)
  // @IsNotEmpty()
  lesionLocation: LesionLocation;

  @IsOptional()
  // @ValidateIf((obj) => obj.criteria === Criteria.CenterToPoplitealHiatus)
  // @IsNotEmpty()
  @IsBoolean()
  centerToPoplitealHiatus: boolean;

  // @ValidateIf((obj) => obj.criteria === Criteria.RegardingPattern)
  @IsOptional()
  @IsEnum(LesionPattern)
  // @IsNotEmpty()
  lesionPattern: LesionPattern;

  // @ValidateIf((obj) => obj.criteria === Criteria.RegardingTissue)
  @IsOptional()
  @IsEnum(TissueQuality)
  // @IsNotEmpty()
  tissueQuality: TissueQuality;

  // @ValidateIf((obj) => obj.criteria === Criteria.RegardingLength)
  // @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  lesionLength: number; // Em mm

  // @ValidateIf((obj) => obj.criteria === Criteria.RegardingExcised)
  // @IsNotEmpty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1)
  excisedQuantity: number; // Armazenar % em ponto flutuante
}
