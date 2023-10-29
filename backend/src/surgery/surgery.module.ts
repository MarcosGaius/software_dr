import { Module } from '@nestjs/common';
import { SurgeryController } from './surgery.controller';
import { SurgeryService } from './surgery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Surgery } from './entities/surgery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Surgery])],
  controllers: [SurgeryController],
  providers: [SurgeryService],
  exports: [],
})
export class SurgeryModule {}
