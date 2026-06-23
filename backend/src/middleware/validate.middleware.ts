import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

// Мидлвар валидации — проверяет req.body по Zod-схеме
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Ошибка валидации',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
