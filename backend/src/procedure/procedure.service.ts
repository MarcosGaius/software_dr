import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meniscectomia } from './entity/meniscectomia.entity';
import { SuturaMeniscal } from './entity/sutura-meniscal.entity';
import { CreateMeniscectomiaProcedureDto } from './dto/meniscectomia-procedure.dto';
import { Repository } from 'typeorm';
import { CreateSuturaMeniscalProcedureDto } from './dto/sutura-meniscal-procedure.dto';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Meniscectomia)
    private meniscectomiaRepository: Repository<Meniscectomia>,
    @InjectRepository(SuturaMeniscal)
    private suturaMeniscalRepository: Repository<SuturaMeniscal>
  ) {}

  async createMeniscectomia(data: CreateMeniscectomiaProcedureDto) {
    return this.meniscectomiaRepository.save(
      this.meniscectomiaRepository.create({ ...data })
    );
  }

  async createSuturaMeniscal(data: CreateSuturaMeniscalProcedureDto) {
    return this.suturaMeniscalRepository.save(
      this.suturaMeniscalRepository.create({ ...data })
    );
  }
}
