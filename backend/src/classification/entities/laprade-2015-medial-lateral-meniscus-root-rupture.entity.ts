import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import {
  LesionType,
  LesionVariation,
} from '../enums/laprade-2015-medial-lateral-meniscus-root-rupture.enum';

// Ruptura da Raiz Meniscal medial e lateral (LaPrade, 2015)

@Entity()
export class LaPrade2015MedialLateralMeniscusRootRupture extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lesionType: LesionType;

  @Column({ nullable: true })
  lesionVariation: LesionVariation;
}
