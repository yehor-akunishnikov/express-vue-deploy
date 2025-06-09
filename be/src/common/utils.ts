import { Router } from "express";

import { AppError } from "../middleware/errorHandler";
import { Controller } from "./types";

export const setupController = (controller: Controller): Router => {
  const router = Router();

  controller.forEach(([meta, handler]) => {
    const [method, path] = meta;

    router[method](path, async (...args) => {
      try {
        return await handler(...args);
      } catch (e) {
        (e as AppError).handlerMeta = meta;

        args[2](e);
      }
    });
  });

  return router;
};
