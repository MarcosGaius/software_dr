import { PrimaryGeneratedColumn, Entity, Column, OneToOne } from 'typeorm';
import { Surgery } from '../../surgery/entities/surgery.entity';
import { ProcedureType } from '../enum/procedureType.enum';
import { RelativePosition } from '../enum/relativePosition.enum';
import { Portion } from '../enum/portion.enum';
import { SutureVariation } from '../enum/sutureVariation.enum';


@Entity()
export class SuturaMeniscal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ProcedureType;

  @Column()
  relativePosition: RelativePosition;

  @Column()
  portion: Portion;

  @Column()
  sutureTechnique: string;

  @Column()
  sutureVariation: SutureVariation;

  @OneToOne(() => Surgery, (surgery) => surgery.suturaMeniscalProcedure)
  surgery: Surgery;
}
