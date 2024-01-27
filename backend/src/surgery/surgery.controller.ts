import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateSurgeryDto } from './dto/surgery.dto';
import { SurgeryService } from './surgery.service';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Surgery } from './entities/surgery.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthGuard } from '@nestjs/passport';
import { ParseJsonPipe } from 'src/utils/pipes/ParseJsonPipe';

@Controller({ path: 'surgery', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class SurgeryController {
  constructor(private readonly surgeryService: SurgeryService) {}

  @Post('patient/:id')
  async create(@Param('id') id: string, @Body() body: CreateSurgeryDto) {
    return this.surgeryService.create(+id, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query('range', new DefaultValuePipe([0, 10]), ParseJsonPipe)
    range: [number, number]
  ): Promise<InfinityPaginationResultType<Surgery>> {
    let limit = range[1] + 1 - range[0];
    if (limit > 50) limit = 50;
    const page = range[0] / limit + 1;

    const [surgery, count] = await this.surgeryService.findManyWithPagination({
      page,
      limit,
    });

    return infinityPagination(surgery, res, {
      resource: 'surgery',
      page,
      limit,
      count,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Surgery>> {
    return this.surgeryService.findOne({ id: +id });
  }
}
