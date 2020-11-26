import {
  IHttpResponse,
  ISurveyCreateReceive,
  ISurveyCreateRequest,
  ISurveyDetailReceive,
  ISurveyUpdateReceive,
  ISurveyUpdateRequest,
} from "common/types/api";
import { ISurvey } from "common/types/model";
import { Request, Response, Router } from "express";
import Database from "../../database";
import wrapAsync from "../utilities/async-wrapper";

export default class SurveyController {
  path = "/survey";
  router = Router();

  constructor(private database: Database) {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.delete(`${this.path}/:id`, wrapAsync(this.delete.bind(this)));
    this.router.get(`${this.path}/:id`, wrapAsync(this.get.bind(this)));
    this.router.post(this.path, wrapAsync(this.create.bind(this)));
    this.router.put(`${this.path}/:id`, wrapAsync(this.update.bind(this)));
  }

  async create(req: Request, res: Response) {
    const payload = req.body as ISurveyCreateRequest;
    const id = await this.database.create("survey", payload);

    res.json(
      new IHttpResponse<ISurveyCreateReceive>({ id })
    );
  }

  async delete(req: Request, res: Response) {
    await this.database.delete("survey", req.params.id);
    res.end();
  }

  async get(req: Request, res: Response) {
    const survey = await this.database.read<ISurvey | undefined>(
      "survey",
      req.params.id
    );

    if (!survey) {
      res.end(404);
    } else {
      res.json(
        new IHttpResponse<ISurveyDetailReceive>({ survey })
      );
    }
  }

  async update(req: Request, res: Response) {
    const payload = req.body as ISurveyUpdateRequest;
    const id = await this.database.update("survey", req.params.id, payload);

    res.json(
      new IHttpResponse<ISurveyUpdateReceive>({ id })
    );
  }
}
