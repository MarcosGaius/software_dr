import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { RelativePortion } from '../enums/nguyen-2014-morphology-meniscus-lesion.enum';

// Tipos de Lesões Meniscal Quanto a Morfologia (Nguyen et al. 2014)

@Entity()
export class Nguyen2014MorphologyMeniscusLesion extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // Deprecated
  // @Column()
  // morphology: LesionMorphology;

  @Column({ default: false })
  horizontal: boolean;

  @Column({ default: false })
  longitudinal: boolean;

  @Column({ default: false })
  radial: boolean;

  @Column({ default: false })
  root: boolean;

  @Column({ default: false })
  displaced: boolean;

  @Column({ default: false })
  complex: boolean;

  @Column({ default: false })
  bucketHandle: boolean;

  @Column({ default: false })
  fraying: boolean;

  @Column({ nullable: true })
  parameniscalCyst: boolean;

  @Column({ nullable: true })
  relativePortion: RelativePortion;
}
