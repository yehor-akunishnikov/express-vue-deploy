import { ControllerHandler, HTTP_STATUS_CODE } from "../common/types";

export interface AppError extends Error {
  status?: number;
  handlerMeta?: ControllerHandler[0];
  errorName?: string;
}

export abstract class DbError extends Error implements AppError {
  public readonly originalErrorInstance: unknown;
  public readonly errorName: string;
  public readonly status?: HTTP_STATUS_CODE;
}

export class DbQueryError extends DbError {
  public readonly errorName = "DbQueryError";

  constructor(
    message: string,
    public readonly originalErrorInstance: unknown,
    public readonly status?: HTTP_STATUS_CODE,
  ) {
    super(message);
  }
}

export class DbInsertError extends DbError {
  public readonly errorName = "DbInsertError";

  constructor(
    message: string,
    public readonly originalErrorInstance: unknown,
    public readonly status?: HTTP_STATUS_CODE,
  ) {
    super(message);
  }
}

export class AuthError extends Error implements AppError {
  public readonly errorName = "AuthError";
  public readonly status: HTTP_STATUS_CODE.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}
