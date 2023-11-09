import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import { Structure } from 'src/surgery/enums/structure.enum';
import { Patient } from 'src/patient/entities/patient.entity';
import { Anderson2011MeniscusLesionClassification } from './anderson-2011-meniscus-lesion-classification.entity';
import { LaPrade2015MedialLateralMeniscusRootRupture } from './laprade-2015-medial-lateral-meniscus-root-rupture.entity';
import { Nguyen2014MorphologyMeniscusLesion } from './nguyen-2014-morphology-meniscus-lesion.entity';
import { RampMeniscusLesionClassification } from './ramp-meniscus-lesion-classification.entity';
import { ThaunatGreifClassification } from './thaunat-greif-classification.entity';

@Entity()
export class Classification extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  structure: Structure;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.classifications)
  patient: Patient;

  // Specific classifications below:

  @OneToOne(() => Anderson2011MeniscusLesionClassification)
  @JoinColumn()
  anderson2011MeniscusLesion: Anderson2011MeniscusLesionClassification;

  @OneToOne(() => LaPrade2015MedialLateralMeniscusRootRupture)
  @JoinColumn()
  laprade2015MedialLateralMeniscusRootRupture: LaPrade2015MedialLateralMeniscusRootRupture;

  @OneToOne(() => Nguyen2014MorphologyMeniscusLesion)
  @JoinColumn()
  nguyen2014MorphologyMeniscusLesion: Nguyen2014MorphologyMeniscusLesion;

  @OneToOne(() => RampMeniscusLesionClassification)
  @JoinColumn()
  rampMeniscusLesion: RampMeniscusLesionClassification;

  @OneToOne(() => ThaunatGreifClassification)
  @JoinColumn()
  thaunatGreif: ThaunatGreifClassification;
}
