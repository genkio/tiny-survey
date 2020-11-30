import Validator from ".";
import { ISurveyCreateRequest } from "../types/api";
import { radioButtonSchema } from "../types/model";

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
