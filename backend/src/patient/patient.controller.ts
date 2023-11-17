import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreatePatientDto } from './dto/patient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() body: CreatePatientDto) {
    return this.patientService.create(body);
  }
}
