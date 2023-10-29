import { Meniscectomia } from 'src/procedure/entity/meniscectomia.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Member } from '../enums/member.enum';
import { MemberPosition } from '../enums/memberPos.enum';
import { InjuryMechanism } from '../enums/injuryMechanism.enum';
import { Structure } from '../enums/structure.enum';
import { Contralateral } from '../enums/contralateral.enum';
import { Limitation } from '../enums/limitation.enum';
import { Patient } from 'src/patient/entities/patient.entity';

@Entity()
export class Surgery {
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

  @Column({ nullable: true, default: [] })
  limitations: Limitation[];

  @Column({ nullable: true, default: [] })
  complaints: string[]; // no dto, tratar o texto com as primeiras letras em maiúsculo

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

  @OneToOne(() => Meniscectomia, (meniscectomia) => meniscectomia.surgery)
  meniscectomiaProcedure: Meniscectomia;
}
