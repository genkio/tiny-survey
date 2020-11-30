import {
  ISurveyCreateReceive,
  ISurveyCreateRequest,
  ISurveyDetailReceive,
  ISurveyUpdateRequest,
} from "common/types";
import axiosApiInstance from "./base";

export async function createSurvey(payload: ISurveyCreateRequest) {
  const { data } = await axiosApiInstance.post<ISurveyCreateReceive>(
    `${process.env.API}/survey`,
    payload
  );
  return data;
}

export async function deleteSurvey(id: string) {
  const res = await axiosApiInstance.delete(`${process.env.API}/survey/${id}`);
  return res;
}

export async function getSurvey(_key: string, id: string) {
  const { data } = await axiosApiInstance.get<ISurveyDetailReceive>(
    `${process.env.API}/survey/${id}`
  );
  return data;
}

export async function updateSurvey(id: string, payload: ISurveyUpdateRequest) {
  const { data } = await axiosApiInstance.put<ISurveyCreateReceive>(
    `${process.env.API}/survey/${id}`,
    payload
  );
  return data;
}
