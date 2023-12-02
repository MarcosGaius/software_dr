import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}

  findManyWithPagination(
    paginationOptions: IPaginationOptions
  ): Promise<[Patient[], number]> {
    return this.patientRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Patient>): Promise<NullableType<Patient>> {
    return this.patientRepository.findOne({
      where: fields,
    });
  }

  create(data: CreatePatientDto) {
    return this.patientRepository.save(this.patientRepository.create(data));
  }

  async update(id: number, data: DeepPartial<Patient>) {
    const patient = await this.patientRepository.findOneBy({
      id,
    });

    if (!patient) {
      throw new NotFoundException({
        errors: {
          name: `Paciente com ID ${id} não encontrado`,
        },
        status: 404,
      });
    }

    await this.patientRepository.update(id, data);

    return {
      ...patient,
      ...data,
    };
  }
}
