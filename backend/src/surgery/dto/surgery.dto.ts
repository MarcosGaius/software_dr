import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
  ValidateIf,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Member } from '../enums/member.enum';
import { MemberPosition } from '../enums/memberPos.enum';
import { Structure } from '../enums/structure.enum';
import { InjuryMechanism } from '../enums/injuryMechanism.enum';
import { Contralateral } from '../enums/contralateral.enum';
import { IsEnumArray } from 'src/utils/validators/is-enum-array';
import { Limitation } from '../enums/limitation.enum';
import { upperCaseFirstTransformer } from 'src/utils/transformers/upper-case-first.transformer';
import { Procedure } from 'src/procedure/enum/procedures.enum';
import { CreateSuturaMeniscalProcedureDto } from 'src/procedure/dto/sutura-meniscal-procedure.dto';
import { CreateMeniscectomiaProcedureDto } from 'src/procedure/dto/meniscectomia-procedure.dto';
import { ProcedureTypeValidation } from 'src/utils/validators/procedure.validator';

export class CreateSurgeryDto {
  @IsEnum(Member)
  @IsNotEmpty()
  member: Member;

  @IsEnum(MemberPosition)
  @IsNotEmpty()
  memberPosition: MemberPosition;

  @IsEnum(Structure)
  @IsNotEmpty()
  structure: Structure;

  @IsEnum(InjuryMechanism)
  @IsNotEmpty()
  injuryMechanism: InjuryMechanism;

  @IsEnum(Contralateral)
  @IsNotEmpty()
  contralateral: Contralateral;

  @IsOptional()
  @IsArray()
  @Validate(IsEnumArray, Object.values(Limitation))
  limitations: Limitation[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (!value) return value;
    return value.map(upperCaseFirstTransformer);
  })
  complaints: string[];

  @IsOptional()
  icd: string;

  @IsOptional()
  @IsNumber()
  icdVersion: number;

  @IsNotEmpty()
  @IsDateString()
  injuredAt: Date;

  @IsEnum(Procedure)
  @IsNotEmpty()
  procedureType: Procedure;

  @IsNotEmpty()
  @Validate(ProcedureTypeValidation)
  procedure: CreateMeniscectomiaProcedureDto | CreateSuturaMeniscalProcedureDto;
}
