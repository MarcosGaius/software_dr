import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

// All taken from https://github.com/ocsoares/class-validator-cpf/tree/master

export function isValidCPF(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  // Com isso, só é permitido o CPF no formato EXATO de pontuação ou um
  // CPF válido sem nenhuma pontuação
  if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/.test(value)) {
    return false;
  }

  return cpf.isValid(value, true);
}
export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return isValidCPF(value);
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a cpf`;
        },
      },
    });
  };
}
