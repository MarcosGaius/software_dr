import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import {
  LesionType,
  LesionVariation,
} from '../enums/thaunat-greif-classification.enum';

// Classificação de Thaunat et al. Modificada por Greif et al.(2020)

@Entity()
export class ThaunatGreifClassification extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lesionType: LesionType;

  @Column({ nullable: true })
  lesionVariation: LesionVariation;
}
