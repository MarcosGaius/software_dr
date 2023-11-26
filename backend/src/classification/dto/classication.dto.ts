import { IsEnum, IsNotEmpty, Validate } from 'class-validator';
import { Classification } from '../enums/classificationType.enum';
import { Structure } from 'src/surgery/enums/structure.enum';
import { ClassificationValidation } from 'src/utils/validators/classification.validator';
import { Anderson2011MeniscusLesionClassificationDto } from './anderson-2011-meniscus-lesion-classification.dto';
import { LaPrade2015MedialLateralMeniscusRootRuptureClassifitcationDto } from './laprade-2015-medial-lateral-meniscus-root-rupture.dto';
import { Nguyen2014MorphologyMeniscusLesionClassificationDto } from './nguyen-2014-morphology-meniscus-lesion.dto';
import { RampMeniscusLesionClassificationDto } from './ramp-meniscus-lesion-classification.dto';
import { ThaunatGreifClassificationDto } from './thaunat-greif-classification.dto';

export class CreateClassicationDto {
  @IsEnum(Structure)
  @IsNotEmpty()
  structure: Structure;

  @IsEnum(Classification)
  @IsNotEmpty()
  classificationType: Classification;

  @IsNotEmpty()
  @Validate(ClassificationValidation)
  classification:
    | Anderson2011MeniscusLesionClassificationDto
    | LaPrade2015MedialLateralMeniscusRootRuptureClassifitcationDto
    | Nguyen2014MorphologyMeniscusLesionClassificationDto
    | RampMeniscusLesionClassificationDto
    | ThaunatGreifClassificationDto;
}
