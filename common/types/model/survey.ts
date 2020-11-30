import { JSONSchemaType } from "ajv";

export type IOption = string;

export const optionSchema: JSONSchemaType<IOption> = {
  maxLength: 30,
  minLength: 3,
  type: "string",
};
export interface IRadioButton {
  options: IOption[];
  title: string;
  type: "radio";
}

export const radioButtonSchema: JSONSchemaType<IRadioButton> = {
  additionalProperties: false,
  properties: {
    options: {
      maxItems: 5,
      minItems: 2,
      items: optionSchema,
      nullable: false,
      type: "array",
    },
    title: {
      nullable: false,
      type: "string",
    },
    type: {
      enum: ["radio"],
      nullable: false,
      type: "string",
    },
  },
  required: ["options", "title", "type"],
  type: "object",
};

export type ISurveySchema = IRadioButton[];

export interface ISurvey {
  createdAt: Date;
  id: string;
  schema: ISurveySchema;
  title: string;
  updatedAt: Date;
  userId: string;
  version: number;
}
