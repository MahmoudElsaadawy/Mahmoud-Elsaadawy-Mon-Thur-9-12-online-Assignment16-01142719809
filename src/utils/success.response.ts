import { Response } from "express";

interface ISuccessResponse<T> {
  res: Response;
  message?: string;
  data?: T;
  statusCode?: number;
}

export const successResponse = <T>({
  res,
  message,
  data,
  statusCode = 201,
}: ISuccessResponse<T>) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
