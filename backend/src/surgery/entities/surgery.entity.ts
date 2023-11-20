import { Meniscectomia } from 'src/procedure/entity/meniscectomia.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Member } from '../enums/member.enum';
import { MemberPosition } from '../enums/memberPos.enum';
import { InjuryMechanism } from '../enums/injuryMechanism.enum';
import { Structure } from '../enums/structure.enum';
import { Contralateral } from '../enums/contralateral.enum';
import { Limitation } from '../enums/limitation.enum';
import { Patient } from 'src/patient/entities/patient.entity';
import { SuturaMeniscal } from 'src/procedure/entity/sutura-meniscal.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class Surgery extends EntityHelper {
  // General info below:

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member: Member;

  @Column()
  memberPosition: MemberPosition;

  @Column()
  structure: Structure;

  @Column()
  injuryMechanism: InjuryMechanism;

  @Column()
  contralateral: Contralateral;

  @Column('text', { array: true, default: [], nullable: true })
  limitations: Limitation[];

  @Column('text', { array: true, default: [], nullable: true })
  complaints: string[];

  @Column({ nullable: true })
  icd: string; // Classificaçào Internacional de Doenças

  @Column({ nullable: true })
  icdVersion: number;

  @Column()
  injuredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Uma dica de como ler essas relações: Nome da tabela + relação + nome da tabela referenciada.
  // Nesse caso ficaria Many Surgery to One Patient (Surgery + ManyToOne + Patient). O que faz sentido,
  // Podem existir várias cirurgias para um mesmo paciente.
  @ManyToOne(() => Patient, (patient) => patient.surgeries)
  patient: Patient;

  // Procedures below:

  @OneToOne(() => Meniscectomia)
  @JoinColumn()
  meniscectomiaProcedure: Meniscectomia;

  @OneToOne(() => SuturaMeniscal)
  @JoinColumn()
  suturaMeniscalProcedure: SuturaMeniscal;
}
