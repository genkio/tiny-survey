import {
  IHttpResponse,
  IResponseCreateReceive,
  IResponseCreateRequest,
  IResponseDetailReceive,
} from "common/types/api";
import { IResponse, ISurvey } from "common/types/model";
import { Request, Response, Router } from "express";
import Database from "../../database";
import wrapAsync from "../utilities/async-wrapper";

export default class ResponseController {
  path = "/response";
  router = Router();

  constructor(private database: Database) {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post(this.path, wrapAsync(this.create.bind(this)));
    this.router.get(`${this.path}/:id`, wrapAsync(this.get.bind(this)));
  }

  async create(req: Request, res: Response) {
    const payload = req.body as IResponseCreateRequest;
    const id = await this.database.create("response", {
      ...payload,
      createdAt: new Date(),
    });

    res.json(
      new IHttpResponse<IResponseCreateReceive>({ id })
    );
  }

  async get(req: Request, res: Response) {
    const response = await this.database.read<IResponse>(
      "response",
      req.params.id
    );
    const survey = await this.database.read<ISurvey>(
      "survey",
      response.surveyId
    );

    res.json(
      new IHttpResponse<IResponseDetailReceive>({
        result: response.data,
        schema: survey.schema,
        title: survey.title,
      })
    );
  }
}
