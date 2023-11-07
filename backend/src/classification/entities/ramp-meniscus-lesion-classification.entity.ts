import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import { LesionType } from '../enums/ramp-meniscal-lesion-classification.enum';

// Lesão Meniscal em Rampa(Thaunat et al, 2021)

@Entity()
export class RampMeniscusLesionClassification extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lesionType: LesionType;
}
