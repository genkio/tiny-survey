export type IOption = string;
export interface IRadioButtonSchema {
  options: IOption[];
  title: string;
  type: "radio";
}

export type ISurveySchema = IRadioButtonSchema[];

export interface ISurvey {
  createdAt: Date;
  id: string;
  schema: ISurveySchema;
  title: string;
  updatedAt: Date;
  userId: string;
  version: number;
}
