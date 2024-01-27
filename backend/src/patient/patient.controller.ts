import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Patch,
  Param,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthGuard } from '@nestjs/passport';
import { ParseJsonPipe } from 'src/utils/pipes/ParseJsonPipe';

@Controller({
  path: 'patient',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('range', new DefaultValuePipe([0, 10]), ParseJsonPipe)
    range: [number, number],
    @Res({ passthrough: true }) res: Response
  ): Promise<InfinityPaginationResultType<Patient>> {
    let limit = range[1] + 1 - range[0];
    if (limit > 50) limit = 50;
    const page = range[0] / limit + 1;

    const [patient, count] = await this.patientService.findManyWithPagination({
      page,
      limit,
    });

    return infinityPagination(patient, res, {
      resource: 'patient',
      page,
      limit,
      count,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Patient>> {
    return this.patientService.findOne({ id: +id });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() body: CreatePatientDto) {
    return this.patientService.create(body);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(@Param('id') id: number, @Body() body: UpdatePatientDto) {
    return this.patientService.update(id, body);
  }
}
