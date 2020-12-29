import { CustomError } from "@libs/common/util";
import { NextFunction, Request, Response } from "express";
import HttpException from "../utilities/http-exception";

export default function errorHandler(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.status ?? 400).send(err.toMessages());
  } else {
    return res
      .status(err.status ?? 500)
      .send(new CustomError(["Something went wrong"]).toMessages());
  }
}
