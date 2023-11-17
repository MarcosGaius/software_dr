import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>
  ) {}

  async create(data: CreatePatientDto) {}
}
