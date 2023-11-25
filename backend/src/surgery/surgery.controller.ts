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
import { CreateSurgeryDto } from './dto/surgery.dto';
import { SurgeryService } from './surgery.service';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Surgery } from './entities/surgery.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthGuard } from '@nestjs/passport';

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
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
  ): Promise<InfinityPaginationResultType<Surgery>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.surgeryService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit }
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Surgery>> {
    return this.surgeryService.findOne({ id: +id });
  }
}
