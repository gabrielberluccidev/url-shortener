import { type NextFunction, type Response, type Request } from 'express';
import { AppError } from '@error/AppError.js';
import z, { ZodError } from 'zod';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    const zodError = z.flattenError(err);

    res.status(400).send({
      message: 'An error has occurred',
      error: zodError,
    });
    return;
  }
  if (err instanceof AppError) {
    res.status(err.statusCode).send({
      message: err.message,
    });
    return;
  }
  res.status(500).send({
    message: 'Internal server error',
  });
};
