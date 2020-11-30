import TinyError from "common/utilities/tiny-error";
import { NextFunction, Request, Response } from "express";
import HttpException from "../utilities/http-exception";

export default function errorHandler(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof TinyError) {
    return res.status(err.status ?? 400).send(err.toMessages());
  } else {
    return res
      .status(err.status ?? 500)
      .send(new TinyError(["Something went wrong"]).toMessages());
  }
}
