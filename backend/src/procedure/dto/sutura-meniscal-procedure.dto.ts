import { IsBoolean, IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';
import { Portion } from '../enum/portion.enum';
import { SutureVariation } from '../enum/sutureVariation.enum';
import { Zone } from '../enum/zone.enum';
import { ProcedureType } from '../enum/procedureType.enum';
import { RelativePosition } from '../enum/relativePosition.enum';

export class CreateSuturaMeniscalProcedureDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsEnum(RelativePosition)
  relativePosition: RelativePosition;

  @IsNotEmpty()
  @IsEnum(Portion)
  portion: Portion;

  @IsNotEmpty()
  @IsEnum(Zone)
  injuryRegion: Zone;

  @IsNotEmpty()
  @IsEnum(ProcedureType)
  injuryExtension: ProcedureType;

  @ValidateIf(
    (object, value) =>
      object.relativePosition === RelativePosition.Medial &&
      object.portion === Portion.AnteriorHorn
  )
  @IsBoolean()
  posteromedialAccess: boolean | null;

  @ValidateIf(
    (object, value) =>
      object.relativePosition === RelativePosition.Lateral &&
      object.portion === Portion.AnteriorHorn
  )
  @IsBoolean()
  posterolateralAccess: boolean | null;

  @IsNotEmpty()
  sutureTechnique: string;

  @IsNotEmpty()
  @IsEnum(SutureVariation)
  sutureVariation: SutureVariation;
}
