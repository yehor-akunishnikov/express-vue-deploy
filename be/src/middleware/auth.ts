import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AuthError } from "../errors";
import config from "../config";

export const authMW = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.header("Authorization") ?? "").split(" ")[1];

  if (token) {
    try {
      if (jwt.verify(token, config.authSecret)) {
        next();
      }
    } catch (e) {
      next(new AuthError("Unauthorized"));
    }
  } else {
    next(new AuthError("Unauthorized"));
  }
};
