import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod/v4";

import { HTTP_STATUS_CODE } from "../common/types";
import { AppError, AuthError, DbError } from "../errors";

export const globalErrorHandlerMW = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status;

  if (err.handlerMeta) {
    console.error(
      `Error at path: [${err.handlerMeta[1]}], method: [${err.handlerMeta[0]}]`,
    );
  }

  if (err instanceof AuthError) {
    res.status(status ?? HTTP_STATUS_CODE.UNAUTHORIZED).json({
      message: err.message ?? "Unauthorized",
    });
  } else if (err instanceof DbError) {
    console.error(
      `${err.errorName}: ${err.message}`,
      err.originalErrorInstance,
    );

    res.status(status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ?? "Internal Server Error",
    });
  } else if (err instanceof ZodError) {
    console.error(`Zod Error: ${z.prettifyError(err)}`);

    res.status(status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ? z.prettifyError(err) : "Invalid request",
    });
  } else {
    console.error(`${err.errorName ?? "Unknown Error"}: ${err.message}`);

    res.status(status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ?? "Internal Server Error",
    });
  }
};
