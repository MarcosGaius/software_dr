import { Classification } from 'src/classification/entities/classification.entity';
import { Surgery } from 'src/surgery/entities/surgery.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Patient extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Surgery, (surgery) => surgery.patient)
  surgeries: Surgery[];

  @OneToMany(() => Classification, (classification) => classification.patient)
  classifications: Classification[];
}
