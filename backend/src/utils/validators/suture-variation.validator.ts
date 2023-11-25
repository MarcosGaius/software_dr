import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';
import {
  InsideOutSutureVariation,
  OutsideInSutureVariation,
} from 'src/procedure/enum/sutureVariation.enum';

@Injectable()
@ValidatorConstraint({ name: 'IsValidSutureVariation', async: true })
export class IsValidSutureVariation implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value: string, validationArguments: ValidationArguments) {
    const { object } = validationArguments;

    if (!value) return false;

    switch ((object as any).sutureTechnique.toLowerCase()) {
      case 'outside-in':
        return Object.values(OutsideInSutureVariation).includes(value as any);
      case 'inside-out':
        return Object.values(InsideOutSutureVariation).includes(value as any);
      default:
        return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const { object } = validationArguments;
    switch ((object as any).sutureTechnique.toLowerCase()) {
      case 'outside-in':
        return 'Invalid outside-in suture variation';
      case 'inside-out':
        return 'Invalid inside-out suture variation';
      default:
        return 'Invalid suture variation';
    }
  }
}
