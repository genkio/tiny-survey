import { ISurvey, ISurveySchema, radioButtonSchema } from "../model";
import { Validator } from "../util";

export const surveyCreateValidator = new Validator<ISurveyCreateRequest>({
  additionalProperties: false,
  properties: {
    schema: {
      items: radioButtonSchema,
      nullable: false,
      maxItems: 5,
      minItems: 1,
      type: "array",
    },
    title: { maxLength: 30, minLength: 3, nullable: false, type: "string" },
  },
  required: ["schema", "title"],
  type: "object",
});

export interface ISurveyCreateRequest {
  schema: ISurveySchema;
  title: ISurvey["title"];
}

export interface ISurveyCreateReceive {
  id: string;
}

export interface ISurveyDetailReceive {
  survey: ISurvey;
}

export interface ISurveyUpdateRequest {
  schema: ISurveySchema;
  title: ISurvey["title"];
}

export interface ISurveyUpdateReceive {
  id: string;
}
