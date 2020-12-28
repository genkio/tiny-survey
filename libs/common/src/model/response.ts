import { IOption, ISurvey } from "./survey";

export type IResponseData = Record<number, IOption>;

export interface IResponse {
  createdAt: Date;
  data: IResponseData;
  id: string;
  surveyId: ISurvey["id"];
}
