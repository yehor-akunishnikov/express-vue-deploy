import "reflect-metadata";

import express from "express";
import path from "node:path";

import { globalErrorHandlerMW } from "./middleware/errorHandler";
import helloRouter from "./features/hello";
import authRouter from "./features/auth";
import userRouter from "./features/user";
import config from "./config";

const app = express();

app.use(express.json());

app.use("/api", helloRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(express.static(path.join(process.cwd(), "assets")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "assets", "index.html"));
});

app.use(globalErrorHandlerMW);

app.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port}. Open: http://localhost:${config.port}`,
  );
});
