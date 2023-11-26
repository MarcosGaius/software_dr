import { Module } from '@nestjs/common';
import { ClassificationController } from './classification.controller';
import { ClassificationService } from './classification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Classification,
  LaPrade2015MedialLateralMeniscusRootRupture,
  Nguyen2014MorphologyMeniscusLesion,
  RampMeniscusLesionClassification,
  ThaunatGreifClassification,
} from './entities';
import { Anderson2011MeniscusLesionClassification } from './entities/anderson-2011-meniscus-lesion-classification.entity';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Classification,
      LaPrade2015MedialLateralMeniscusRootRupture,
      Nguyen2014MorphologyMeniscusLesion,
      RampMeniscusLesionClassification,
      ThaunatGreifClassification,
      Anderson2011MeniscusLesionClassification,
    ]),
    PatientModule,
  ],
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class ClassificationModule {}
