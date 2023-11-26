import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';
import { ThaunatGreifClassification } from 'src/classification/entities';
import {
  LesionType,
  Type3LesionVariation,
  Type4LesionVariation,
} from 'src/classification/enums/thaunat-greif-classification.enum';

@Injectable()
@ValidatorConstraint({
  name: 'IsValidThaunatGreifLesionVariation',
  async: true,
})
export class IsValidThaunatGreifLesionVariation
  implements ValidatorConstraintInterface
{
  constructor() {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const { object } = validationArguments;

    if (!value) return false;

    switch ((object as ThaunatGreifClassification).lesionType.toLowerCase()) {
      case LesionType.Type3.toLowerCase():
        return Object.values(Type3LesionVariation).includes(value as any);
      case LesionType.Type4.toLowerCase():
        return Object.values(Type4LesionVariation).includes(value as any);
      default:
        return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const { object } = validationArguments;
    switch ((object as ThaunatGreifClassification).lesionType.toLowerCase()) {
      case LesionType.Type3.toLowerCase():
        return 'Invalid Type 3 lesion variation';
      case LesionType.Type4.toLowerCase():
        return 'Invalid Type 4 lesion variation';
      default:
        return 'Invalid lesion variation';
    }
  }
}
