import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import { Classification } from './classification.entity';
import { LesionType } from '../enums/anderson-2011-meniscus-lesion-classification.enum';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

// Classificação das Lesões Meniscais (Anderson et al, 2011)

export class Anderson2011MeniscusLesionClassificationDto {
  @IsNotEmpty()
  @IsEnum(LesionType)
  lesionType: LesionType;

  @IsNotEmpty()
  lesionExtension: string;

  @IsNotEmpty()
  lesionLocation: string;

  @IsNotEmpty()
  @IsBoolean()
  centerToPoplitealHiatus: boolean;

  @IsNotEmpty()
  lesionPattern: string;

  @IsNotEmpty()
  tissueQuality: string;

  @IsNotEmpty()
  lesionLength: number;

  @IsNotEmpty()
  excisedQuantity: number;

  @OneToOne(
    () => Classification,
    (classification) => classification.anderson2011MeniscusLesion
  )
  classification: Classification;
}
