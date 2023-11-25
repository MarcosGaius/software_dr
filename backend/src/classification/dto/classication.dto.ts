import { IsEnum, IsNotEmpty, Validate } from 'class-validator';
import { CreateSuturaMeniscalProcedureDto } from 'src/procedure/dto/sutura-meniscal-procedure.dto';
import { CreateMeniscectomiaProcedureDto } from 'src/procedure/dto/meniscectomia-procedure.dto';
import { Classification } from '../enums/classificationType.enum';
import { Structure } from 'src/surgery/enums/structure.enum';
import { ClassificationValidation } from 'src/utils/validators/classification.validator';

export class CreateClassicationDto {
  @IsEnum(Structure)
  @IsNotEmpty()
  structure: Structure;

  @IsEnum(Classification)
  @IsNotEmpty()
  classificationType: Classification;

  @IsNotEmpty()
  @Validate(ClassificationValidation)
  procedure: CreateMeniscectomiaProcedureDto | CreateSuturaMeniscalProcedureDto;
}
