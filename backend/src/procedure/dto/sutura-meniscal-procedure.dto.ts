import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidateBy,
  ValidateIf,
} from 'class-validator';
import { Portion } from '../enum/portion.enum';
import {
  InsideOutSutureVariation,
  OutsideInSutureVariation,
  SutureVariation,
} from '../enum/sutureVariation.enum';
import { Zone } from '../enum/zone.enum';
import { RelativePosition } from '../enum/relativePosition.enum';
import { Extension } from '../enum/extension.enum';
import { IsValidSutureVariation } from 'src/utils/validators/suture-variation.validator';

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
  @IsEnum(Extension)
  injuryExtension: Extension;

  @ValidateIf(
    (object, value) =>
      object.relativePosition === RelativePosition.Medial &&
      object.portion === Portion.PosteriorHorn
  )
  @IsBoolean()
  posteromedialAccess: boolean | null;

  @ValidateIf(
    (object, value) =>
      object.relativePosition === RelativePosition.Lateral &&
      object.portion === Portion.PosteriorHorn
  )
  @IsBoolean()
  posterolateralAccess: boolean | null;

  @IsOptional()
  sutureTechnique: string;

  @IsOptional()
  @Validate(IsValidSutureVariation)
  sutureVariation: SutureVariation;

  @ValidateIf(
    (object, _) => !!object.sutureTechnique && !!object.sutureVariation
  )
  @IsNotEmpty()
  deviceQuantity: number; // quantidade de suturas
}
