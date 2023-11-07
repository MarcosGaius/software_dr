import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import { Classification } from './classification.entity';
import { LesionType } from '../enums/anderson-2011-meniscus-lesion-classification.enum';

// Classificação das Lesões Meniscais (Anderson et al, 2011)

@Entity()
export class Anderson2011MeniscusLesionClassification extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lesionType: LesionType;

  @Column()
  lesionExtension: string;

  @Column()
  lesionLocation: string;

  @Column()
  centerToPoplitealHiatus: boolean;

  @Column()
  lesionPattern: string;

  @Column()
  tissueQuality: string;

  @Column()
  lesionLength: number;

  @Column()
  excisedQuantity: number;

  @OneToOne(
    () => Classification,
    (classification) => classification.anderson2011MeniscusLesion
  )
  classification: Classification;
}
