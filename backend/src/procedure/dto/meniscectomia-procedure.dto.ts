import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProcedureType } from '../enum/procedureType.enum';
import { RelativePosition } from '../enum/relativePosition.enum';
import { Portion } from '../enum/portion.enum';
import { Zone } from '../enum/zone.enum';

export class CreateMeniscectomiaProcedureDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsEnum(ProcedureType)
  type: ProcedureType;

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
}
