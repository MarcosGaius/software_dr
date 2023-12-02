import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Surgery } from './entities/surgery.entity';
import { Repository } from 'typeorm';
import { CreateSurgeryDto } from './dto/surgery.dto';
import { PatientService } from 'src/patient/patient.service';
import { ProcedureService } from 'src/procedure/procedure.service';
import { CreateSuturaMeniscalProcedureDto } from 'src/procedure/dto/sutura-meniscal-procedure.dto';
import { CreateMeniscectomiaProcedureDto } from 'src/procedure/dto/meniscectomia-procedure.dto';
import { IPaginationOptions } from 'src/utils/types/pagination-options.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class SurgeryService {
  constructor(
    @InjectRepository(Surgery) private surgeryRepository: Repository<Surgery>,
    private readonly patientService: PatientService,
    private readonly procedureService: ProcedureService
  ) {}

  async create(patientId: number, body: CreateSurgeryDto) {
    const patient = await this.patientService.findOne({ id: patientId });

    if (!patient) {
      throw new NotFoundException(
        `Paciente com ID ${patientId} não encontrado`
      );
    }

    const surgery = this.surgeryRepository.create({
      complaints: body.complaints,
      contralateral: body.contralateral,
      icd: body.icd,
      icdVersion: body.icdVersion,
      injuredAt: body.injuredAt,
      member: body.member,
      memberPosition: body.memberPosition,
      structure: body.structure,
      injuryMechanism: body.injuryMechanism,
      limitations: body.limitations,
      procedure: body.procedureType,
      patient,
    });

    const procedureType = body.procedureType;

    switch (procedureType) {
      case 'meniscectomia':
        surgery.meniscectomiaProcedure =
          await this.procedureService.createMeniscectomia(
            body.procedure as CreateMeniscectomiaProcedureDto
          );
      case 'sutura-meniscal':
        surgery.suturaMeniscalProcedure =
          await this.procedureService.createSuturaMeniscal(
            body.procedure as CreateSuturaMeniscalProcedureDto
          );
      default:
    }

    return this.surgeryRepository.save(surgery);
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions
  ): Promise<[Surgery[], number]> {
    return this.surgeryRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Surgery>): Promise<NullableType<Surgery>> {
    return this.surgeryRepository.findOne({
      where: fields,
      relations: {
        patient: true,
        meniscectomiaProcedure: true,
        suturaMeniscalProcedure: true,
      },
    });
  }
}
