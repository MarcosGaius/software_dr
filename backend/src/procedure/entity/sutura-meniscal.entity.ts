import { PrimaryGeneratedColumn, Entity, Column, OneToOne } from 'typeorm';
import { Surgery } from '../../surgery/entities/surgery.entity';
import { Portion } from '../enum/portion.enum';
import { SutureVariation } from '../enum/sutureVariation.enum';
import { EntityHelper } from 'src/utils/entity-helper';
import { RelativePosition } from '../enum/relativePosition.enum';
import { Zone } from '../enum/zone.enum';
import { Extension } from '../enum/extension.enum';

@Entity()
export class SuturaMeniscal extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  relativePosition: RelativePosition;

  @Column()
  portion: Portion;

  @Column()
  injuryRegion: Zone;

  @Column()
  injuryExtension: Extension;

  @Column({ nullable: true })
  posteromedialAccess: boolean;

  @Column({ nullable: true })
  posterolateralAccess: boolean;

  @Column({ nullable: true })
  sutureTechnique: string;

  @Column({ nullable: true })
  sutureVariation: SutureVariation;

  @Column({ nullable: true })
  deviceQuantity: number;

  @OneToOne(() => Surgery, { nullable: true })
  surgery: Surgery;
}
