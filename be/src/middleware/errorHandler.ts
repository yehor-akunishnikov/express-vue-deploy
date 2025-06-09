import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod/v4";

import { ControllerHandler, HTTP_STATUS_CODE } from "../common/types";

export interface AppError extends Error {
  status?: number;
  handlerMeta?: ControllerHandler[0];
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const status = err.status;

  if (err.handlerMeta) {
    console.error(
      `Error at path: [${err.handlerMeta[1]}], method: [${err.handlerMeta[0]}]`,
    );
  }

  if (err instanceof ZodError) {
    console.error(`Zod Error: ${z.prettifyError(err)}`);

    res.status(status ?? HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: err.message ? z.prettifyError(err) : "Invalid request",
    });
  } else {
    console.error(`Unknown Error: ${err.message}`);

    res.status(status ?? HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      message: err.message ?? "Internal Server Error",
    });
  }
};
