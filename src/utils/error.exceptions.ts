import { NextFunction, Request, Response } from "express"
import z from "zod"

export interface IError extends Error {
  statusCode: number
  validationErrors: z.core.$ZodIssue[]
}

export class AppError extends Error {
  constructor(message: string, options: ErrorOptions, public statusCode: number, public validationErrors?: z.core.$ZodIssue[]){
    super(message, options)
  }
}

export class NotFoundException extends AppError {
  constructor(message: string = "Not found", options: ErrorOptions = {}){
    super(message, options, 404)
  }
}

export class BadRequestException extends AppError {
  constructor(message: string, options: ErrorOptions = {}){
    super(message, options, 400)
  }
}

export class UnauthorizedException extends AppError {
  constructor(message: string = "You are not authorized to preform this action", options: ErrorOptions = {}){
    super(message, options, 401)
  }
}

export class ConflictException extends AppError {
  constructor(message: string, options: ErrorOptions = {}){
    super(message, options, 409)
  }
}

export class validationException extends AppError {
  constructor(validationErrors: z.core.$ZodIssue[], options: ErrorOptions = {}){
    super("Validation error", options, 422, validationErrors)
  }
}

export const globalErrorHandler = (err: IError, req: Request, res: Response, next: NextFunction)=> {
  res.status(err.statusCode || 500).json({
    Message: err.message,
    validationError: err.validationErrors,
    status: err.statusCode,
    stack: err.stack
  })
}