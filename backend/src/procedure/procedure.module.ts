import { Module } from '@nestjs/common';
import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meniscectomia } from './entity/meniscectomia.entity';
import { SuturaMeniscal } from './entity/sutura-meniscal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meniscectomia, SuturaMeniscal])],
  controllers: [ProcedureController],
  providers: [ProcedureService],
  exports: [ProcedureService],
})
export class ProcedureModule {}
