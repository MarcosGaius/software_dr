import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

export function recursiveErrorMessages(errors: ValidationError[]) {
  return errors.reduce((accumulator, currentValue) => {
    const propertyErrors = {};

    // If constraints are present, use them
    if (currentValue.constraints) {
      propertyErrors[currentValue.property] = Object.values(
        currentValue.constraints
      ).join(', ');
    } else {
      // If constraints are not present, check if children exist
      if (currentValue.children && currentValue.children.length > 0) {
        const childErrors = recursiveErrorMessages(currentValue.children);
        // Merge child errors into the parent object
        Object.assign(propertyErrors, childErrors);
      }
    }

    return { ...accumulator, ...propertyErrors };
  }, {});
}

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  exceptionFactory: (errors: ValidationError[]) =>
    new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        errors: recursiveErrorMessages(errors),
      },
      HttpStatus.BAD_REQUEST
    ),
};

export default validationOptions;
