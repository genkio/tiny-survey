import { NextFunction, Request, Response } from "express";
import HttpException from "../utilities/http-exception";

export default function errorHandler(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status ?? 500;
  console.error(err.message);

  res.status(status).send({
    status,
    message: "Something went wrong",
  });
}
