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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassificationService } from './classification.service';
import { CreateClassicationDto } from './dto/classication.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Classification } from './entities';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';

@Controller({ path: 'classification', version: '1' })
// @UseGuards(AuthGuard('jwt'))
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post('/patient/:id')
  async create(@Param('id') id: string, @Body() body: CreateClassicationDto) {
    return this.classificationService.create(+id, body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ): Promise<InfinityPaginationResultType<Classification>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.classificationService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit }
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Classification>> {
    return this.classificationService.findOne({ id: +id });
  }
}
