import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message:
        issue?.message == 'Required'
          ? `${issue?.path[issue.path.length - 1]} field is required`
          : issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message:
      (errors && errors?.length && errors?.[0]?.message) ||
      'Input validation error. Please check your input and try again',
    errorMessages: errors,
  };
};

export default handleZodError;
