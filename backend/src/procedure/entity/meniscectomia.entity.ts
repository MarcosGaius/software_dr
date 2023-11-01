import { PrimaryGeneratedColumn, Entity, Column, OneToOne } from 'typeorm';
import { Surgery } from '../../surgery/entities/surgery.entity';
import { ProcedureType } from '../enum/procedureType.enum';
import { RelativePosition } from '../enum/relativePosition.enum';
import { Extension } from '../enum/extension.enum';
import { Zone } from '../enum/zone.enum';
import { Portion } from '../enum/portion.enum';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Meniscectomia extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ProcedureType;

  @Column()
  relativePosition: RelativePosition;

  @Column()
  portion: Portion;

  @Column()
  injuryRegion: Zone;

  @Column()
  injuryExtension: Extension;

  @OneToOne(() => Surgery, (surgery) => surgery.meniscectomiaProcedure)
  surgery: Surgery;
}
