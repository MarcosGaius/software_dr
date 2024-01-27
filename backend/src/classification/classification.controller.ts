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
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ClassificationService } from './classification.service';
import { CreateClassicationDto } from './dto/classication.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Classification } from './entities';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { ParseJsonPipe } from 'src/utils/pipes/ParseJsonPipe';

@Controller({ path: 'classification', version: '1' })
@UseGuards(AuthGuard('jwt'))
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post('/patient/:id')
  async create(@Param('id') id: string, @Body() body: CreateClassicationDto) {
    return this.classificationService.create(+id, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('range', new DefaultValuePipe([0, 10]), ParseJsonPipe)
    range: [number, number],
    @Res({ passthrough: true })
    res: Response
  ): Promise<InfinityPaginationResultType<Classification>> {
    let limit = range[1] + 1 - range[0];
    if (limit > 50) limit = 50;
    const page = range[0] / limit + 1;

    const [classification, count] =
      await this.classificationService.findManyWithPagination({
        limit,
        page,
      });

    return infinityPagination(classification, res, {
      resource: 'classification',
      page,
      limit,
      count,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Classification>> {
    return this.classificationService.findOne({ id: +id });
  }
}
