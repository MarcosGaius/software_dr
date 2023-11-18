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
} from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.entity';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthGuard } from '@nestjs/passport';

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
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ): Promise<InfinityPaginationResultType<Patient>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.patientService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit }
    );
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
