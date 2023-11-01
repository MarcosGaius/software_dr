import { PrimaryGeneratedColumn, Entity, Column, OneToOne } from 'typeorm';
import { Surgery } from '../../surgery/entities/surgery.entity';
import { Portion } from '../enum/portion.enum';
import { SutureVariation } from '../enum/sutureVariation.enum';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class SuturaMeniscal extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  portion: Portion;

  @Column()
  sutureTechnique: string;

  @Column()
  sutureVariation: SutureVariation;

  @OneToOne(() => Surgery, (surgery) => surgery.suturaMeniscalProcedure)
  surgery: Surgery;
}
