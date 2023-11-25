import { Module } from '@nestjs/common';
import { SurgeryController } from './surgery.controller';
import { SurgeryService } from './surgery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Surgery } from './entities/surgery.entity';
import { PatientModule } from 'src/patient/patient.module';
import { ProcedureModule } from 'src/procedure/procedure.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Surgery]),
    PatientModule,
    ProcedureModule,
  ],
  controllers: [SurgeryController],
  providers: [SurgeryService],
  exports: [],
})
export class SurgeryModule {}
