import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import * as userRepo from "../features/user/repo";
import { AuthError } from "../errors";
import config from "../config";

export async function authMW(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = (req.header("Authorization") ?? "").split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, config.authSecret) as JwtPayload;
      const email: string = decoded.data;
      const user = await userRepo.findOneByEmail(email);

      if (user) {
        res.locals.userEmail = user.email;
        next();
      } else {
        next(new AuthError("Unauthorized"));
      }
    } catch (e) {
      next(new AuthError("Unauthorized"));
    }
  } else {
    next(new AuthError("Unauthorized"));
  }
}
