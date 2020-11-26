import { IResponse, IResponseData, ISurvey, ISurveySchema } from "../model";

export interface IResponseCreateRequest {
  data: IResponseData;
  surveyId: IResponse["surveyId"];
}

export interface IResponseCreateReceive {
  id: IResponse["id"];
}

export interface IResponseDetailReceive {
  result: IResponseData;
  schema: ISurveySchema;
  title: ISurvey["title"];
}
