import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validate as classValidate } from 'class-validator';
import { TypedRequest } from "../typed-request.interface";
import { ValidationError } from "../../errors/validation";


export function validate<T extends object>(type: (new() => T), origin: 'body'): (req: TypedRequest<T>, res: Response, next: NextFunction) => Promise<void>
export function validate<T extends object>(type: (new() => T)): (req: TypedRequest<T>, res: Response, next: NextFunction) => Promise<void>
export function validate<T extends object>(type: (new() => T), origin: 'body'  = 'body') {
  return async (req: TypedRequest<any, any, any>, res: Response, next: NextFunction) => {
    const data = plainToClass(type, req[origin]);
    const errors = await classValidate(data, { whitelist: true, forbidNonWhitelisted: true });
    
    if (errors.length) {
      next(new ValidationError(errors));
    } else {
      req[origin] = data;
      next();
    }
  }
}