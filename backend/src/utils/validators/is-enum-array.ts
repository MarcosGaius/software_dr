import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ name: 'IsEnumArray', async: true })
export class IsEnumArray implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (!value || !Array.isArray(value)) {
      return false;
    }

    for (const item of value) {
      if (!args.constraints.includes(item)) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    if (Array.isArray(args.value)) {
      if (args.value.length === 0) {
        return `The ${args.property} array is empty.`;
      } else {
        return `The ${args.property} array contains invalid enum values.`;
      }
    } else {
      return `The ${args.property} must be an array.`;
    }
  }
}
