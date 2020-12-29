import {
  IHttpResponse,
  ISurveyCreateReceive,
  ISurveyCreateRequest,
  ISurveyDetailReceive,
  ISurveyUpdateReceive,
  ISurveyUpdateRequest,
  surveyCreateValidator,
} from "@libs/common/api";
import { ISurvey } from "@libs/common/model";
import { CustomError } from "@libs/common/util";
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
    /**
     * @swagger
     * /survey/{id}:
     *    delete:
     *      summary: Delete a survey
     *      description: Allow author to delete a survey
     *      tags: [ Survey ]
     */
    this.router.delete(`${this.path}/:id`, wrapAsync(this.delete.bind(this)));
    /**
     * @swagger
     * /survey/{id}:
     *    get:
     *      summary: Get a survey
     *      description: Allow any user to get a survey
     *      tags: [ Survey ]
     */
    this.router.get(`${this.path}/:id`, wrapAsync(this.get.bind(this)));
    /**
     * @swagger
     * /survey:
     *    post:
     *      summary: Create a survey
     *      description: Allow authenticated user to create a survey
     *      tags: [ Survey ]
     */
    this.router.post(this.path, wrapAsync(this.create.bind(this)));
    /**
     * @swagger
     * /survey/{id}:
     *    put:
     *      summary: Update a survey
     *      description: Allow author to update a survey
     *      tags: [ Survey ]
     */
    this.router.put(`${this.path}/:id`, wrapAsync(this.update.bind(this)));
  }

  async create(req: Request, res: Response) {
    const payload = req.body as ISurveyCreateRequest;

    const errorMessages = surveyCreateValidator.validate(payload);
    if (errorMessages) throw new CustomError(errorMessages);

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
    const survey = await this.database.read<ISurvey>("survey", req.params.id);

    res.json(
      new IHttpResponse<ISurveyDetailReceive>({ survey })
    );
  }

  async update(req: Request, res: Response) {
    const payload = req.body as ISurveyUpdateRequest;
    const id = await this.database.update("survey", req.params.id, payload);

    res.json(
      new IHttpResponse<ISurveyUpdateReceive>({ id })
    );
  }
}
