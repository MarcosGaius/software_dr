import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  LesionMorphology,
  RelativePortion,
} from '../enums/nguyen-2014-morphology-meniscus-lesion.enum';

// Tipos de Lesões Meniscal Quanto a Morfologia (Nguyen et al. 2014)

@Entity()
export class Nguyen2014MorphologyMeniscusLesion extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  morphology: LesionMorphology;

  @Column({ nullable: true })
  parameniscalCyst: boolean;

  @Column({ nullable: true })
  relativePortion: RelativePortion;
}
