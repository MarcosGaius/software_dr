import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import { Classification } from './classification.entity';
import {
  Criteria,
  LesionType,
} from '../enums/anderson-2011-meniscus-lesion-classification.enum';

// Classificação das Lesões Meniscais (Anderson et al, 2011)

@Entity()
export class Anderson2011MeniscusLesionClassification extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  criteria: Criteria;

  @Column({ nullable: true })
  lesionType: LesionType;

  @Column({ nullable: true })
  lesionExtension: string;

  @Column({ nullable: true })
  lesionLocation: string;

  @Column({ nullable: true })
  centerToPoplitealHiatus: boolean;

  @Column({ nullable: true })
  lesionPattern: string;

  @Column({ nullable: true })
  tissueQuality: string;

  @Column({ nullable: true })
  lesionLength: number;

  @Column({ type: 'float', nullable: true })
  excisedQuantity: number;

  @OneToOne(
    () => Classification,
    (classification) => classification.anderson2011MeniscusLesion
  )
  classification: Classification;
}
