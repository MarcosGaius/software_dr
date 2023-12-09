import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Classification,
  LaPrade2015MedialLateralMeniscusRootRupture,
  Nguyen2014MorphologyMeniscusLesion,
  RampMeniscusLesionClassification,
  ThaunatGreifClassification,
} from './entities';
import { Repository } from 'typeorm';
import { CreateClassicationDto } from './dto/classication.dto';
import { PatientService } from 'src/patient/patient.service';
import { Anderson2011MeniscusLesionClassification } from './entities/anderson-2011-meniscus-lesion-classification.entity';
import { Classification as ClassificationEnum } from './enums/classificationType.enum';
import { IPaginationOptions } from 'src/utils/types/pagination-options.type';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private classificationRepository: Repository<Classification>,
    @InjectRepository(Anderson2011MeniscusLesionClassification)
    private anderson2011MeniscusLesionRepository: Repository<Anderson2011MeniscusLesionClassification>,
    @InjectRepository(LaPrade2015MedialLateralMeniscusRootRupture)
    private laprade2015Repository: Repository<LaPrade2015MedialLateralMeniscusRootRupture>,
    @InjectRepository(Nguyen2014MorphologyMeniscusLesion)
    private nguyen2014Repository: Repository<Nguyen2014MorphologyMeniscusLesion>,
    @InjectRepository(RampMeniscusLesionClassification)
    private rampMeniscusRepository: Repository<RampMeniscusLesionClassification>,
    @InjectRepository(ThaunatGreifClassification)
    private thaunatGreifRepository: Repository<ThaunatGreifClassification>,
    private readonly patientService: PatientService
  ) {}

  private procedureToRepositoryMap = {
    [ClassificationEnum.Anderson2011MeniscusLesion]:
      this.anderson2011MeniscusLesionRepository,
    [ClassificationEnum.Laprade2015MedialLateralMeniscusRootRupture]:
      this.laprade2015Repository,
    [ClassificationEnum.Nguyen2014MorphologyMeniscusLesion]:
      this.nguyen2014Repository,
    [ClassificationEnum.RampMeniscusLesion]: this.rampMeniscusRepository,
    [ClassificationEnum.ThaunatGreif]: this.thaunatGreifRepository,
  };

  private classificationToEntityFieldMap = {
    [ClassificationEnum.Anderson2011MeniscusLesion]:
      'anderson2011MeniscusLesion',
    [ClassificationEnum.Laprade2015MedialLateralMeniscusRootRupture]:
      'laprade2015MedialLateralMeniscusRootRupture',
    [ClassificationEnum.Nguyen2014MorphologyMeniscusLesion]:
      'nguyen2014MorphologyMeniscusLesion',
    [ClassificationEnum.RampMeniscusLesion]: 'rampMeniscusLesion',
    [ClassificationEnum.ThaunatGreif]: 'thaunatGreif',
  };

  async create(patientId: number, body: CreateClassicationDto) {
    const patient = await this.patientService.findOne({ id: patientId });

    if (!patient) {
      throw new NotFoundException(
        `Paciente com ID ${patientId} não encontrado`
      );
    }

    const classificationType = body.classificationType;

    const classification = this.classificationRepository.create({
      patient,
      structure: body.structure,
      procedure: classificationType,
    });

    classification[this.classificationToEntityFieldMap[classificationType]] =
      await this.createClassification(body);

    return this.classificationRepository.save(classification);
  }

  async createClassification(body: CreateClassicationDto) {
    const repository = this.procedureToRepositoryMap[body.classificationType];

    return (repository as Repository<any>).save(
      repository.create({
        ...(body.classification as any),
      })
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions
  ): Promise<[Classification[], number]> {
    return this.classificationRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: {
        patient: true,
      },
    });
  }

  findOne(
    fields: EntityCondition<Classification>
  ): Promise<NullableType<Classification>> {
    return this.classificationRepository.findOne({
      where: fields,
      relations: {
        patient: true,
        anderson2011MeniscusLesion: true,
        laprade2015MedialLateralMeniscusRootRupture: true,
        nguyen2014MorphologyMeniscusLesion: true,
        rampMeniscusLesion: true,
        thaunatGreif: true,
      },
    });
  }
}
