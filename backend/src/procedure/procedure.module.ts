import { Module } from '@nestjs/common';
import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meniscectomia } from './entity/meniscectomia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meniscectomia])],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}
