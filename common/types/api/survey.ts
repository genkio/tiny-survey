import { ISurvey, ISurveySchema } from "../model";

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
