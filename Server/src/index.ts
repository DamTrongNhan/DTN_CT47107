import express from "express";

import cors from "cors";
import compression from "compression";
import passport from "passport";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import "module-alias/register";

import Locals from "@provider/locals";
import { Database } from "@provider/database";
import router from "@router/index";

const PORT = Locals.config().port;

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
Database.init();

app.use(passport.initialize());
app.use(cookieParser());

app.use("/", router());

app.use((req: express.Request, res: express.Response, next: any) => {
  return next(createError(404));
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) =>
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Internal Server Error" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} http://localhost:${PORT}`);
});
