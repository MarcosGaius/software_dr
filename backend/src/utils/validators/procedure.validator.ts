import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validateOrReject,
} from 'class-validator';
import { CreateMeniscectomiaProcedureDto } from 'src/procedure/dto/meniscectomia-procedure.dto';
import { CreateSuturaMeniscalProcedureDto } from 'src/procedure/dto/sutura-meniscal-procedure.dto';
import { Procedure } from 'src/procedure/enum/procedures.enum';
import { ValidationError } from '@nestjs/common';

@ValidatorConstraint({ name: 'ProcedureTypeValidation', async: true })
export class ProcedureTypeValidation implements ValidatorConstraintInterface {
  private errors;
  async validate(value: object, args: ValidationArguments) {
    switch (args.object['procedureType']) {
      case Procedure.Meniscectomia:
        return await validateOrReject(
          new CreateMeniscectomiaProcedureDto(value)
        )
          .then(() => true)
          .catch((e) => {
            this.errors = e;
            return false;
          });
      case Procedure.SuturaMeniscal:
        return await validateOrReject(
          new CreateSuturaMeniscalProcedureDto(value)
        )
          .then(() => true)
          .catch((e) => {
            this.errors = e;
            return false;
          });
      default:
        return false;
    }
  }

  // Não achei uma maneira de separar os erros e retorná-los para serem usados pela exceptionFactory.
  // A função abaixo transforma os erros em uma string, para atender o requisito da defaultMessage
  recursiveErrorMessages(errors: ValidationError[]): string {
    return errors.reduce((accumulator, currentValue) => {
      let errorMessages = '';

      // If constraints are present, use them
      if (currentValue.constraints) {
        errorMessages += Object.values(currentValue.constraints).join(', ');
      } else {
        // If constraints are not present, check if children exist
        if (currentValue.children && currentValue.children.length > 0) {
          const childErrors = this.recursiveErrorMessages(
            currentValue.children
          );
          // Concatenate child errors into the parent string with a space, if childErrors is not an empty string
          errorMessages += childErrors ? childErrors + '. ' : '';
        }
      }

      // Append the errorMessages to accumulator with a space, if errorMessages is not an empty string
      return accumulator + (errorMessages ? errorMessages + '. ' : '');
    }, '');
  }

  defaultMessage(args: ValidationArguments) {
    const errors = this.recursiveErrorMessages(this.errors || []);
    this.errors = '';
    return errors;
  }
}
