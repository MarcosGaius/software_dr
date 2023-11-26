import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validateOrReject,
} from 'class-validator';
import { ValidationError } from '@nestjs/common';
import { Classification } from 'src/classification/enums/classificationType.enum';
import { Nguyen2014MorphologyMeniscusLesionClassificationDto } from 'src/classification/dto/nguyen-2014-morphology-meniscus-lesion.dto';
import { RampMeniscusLesionClassificationDto } from 'src/classification/dto/ramp-meniscus-lesion-classification.dto';
import { ThaunatGreifClassificationDto } from 'src/classification/dto/thaunat-greif-classification.dto';
import { Anderson2011MeniscusLesionClassificationDto } from 'src/classification/dto/anderson-2011-meniscus-lesion-classification.dto';
import { LaPrade2015MedialLateralMeniscusRootRuptureClassifitcationDto } from 'src/classification/dto/laprade-2015-medial-lateral-meniscus-root-rupture.dto';

// Ver um jeito de evitar o switch case
// No futuro, com mais classificações, isso pode ficar horrível para manuntenção

@ValidatorConstraint({ name: 'ClassificationValidation', async: true })
export class ClassificationValidation implements ValidatorConstraintInterface {
  private errors;
  async validate(value: object, args: ValidationArguments) {
    switch (args.object['classificationType']) {
      case Classification.Nguyen2014MorphologyMeniscusLesion:
        return await validateOrReject(
          new Nguyen2014MorphologyMeniscusLesionClassificationDto(value)
        )
          .then(() => true)
          .catch((e) => {
            this.errors = e;
            return false;
          });
      case Classification.RampMeniscusLesion:
        return await validateOrReject(
          new RampMeniscusLesionClassificationDto(value)
        )
          .then(() => true)
          .catch((e) => {
            this.errors = e;
            return false;
          });
      case Classification.ThaunatGreif:
        return await validateOrReject(new ThaunatGreifClassificationDto(value))
          .then(() => true)
          .catch((e) => {
            this.errors = e;
            return false;
          });
      case Classification.Anderson2011MeniscusLesion:
        return await validateOrReject(
          new Anderson2011MeniscusLesionClassificationDto(value)
        )
          .then(() => true)
          .catch((e) => {
            this.errors = e;
            return false;
          });
      case Classification.Laprade2015MedialLateralMeniscusRootRupture:
        return await validateOrReject(
          new LaPrade2015MedialLateralMeniscusRootRuptureClassifitcationDto(
            value
          )
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
