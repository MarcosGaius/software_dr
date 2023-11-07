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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Classification,
      LaPrade2015MedialLateralMeniscusRootRupture,
      Nguyen2014MorphologyMeniscusLesion,
      RampMeniscusLesionClassification,
      ThaunatGreifClassification,
    ]),
  ],
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class ClassificationModule {}
