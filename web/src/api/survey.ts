import axios from "axios";
import {
  ISurveyCreateReceive,
  ISurveyCreateRequest,
  ISurveyDetailReceive,
  ISurveyUpdateRequest,
} from "common/types";

export async function createSurvey(payload: ISurveyCreateRequest) {
  const { data } = await axios.post<ISurveyCreateReceive>(
    `${process.env.API}/survey`,
    payload
  );
  return data;
}

export async function deleteSurvey(id: string) {
  const res = await axios.delete(`${process.env.API}/survey/${id}`);
  return res;
}

export async function getSurvey(_key: string, id: string) {
  const { data } = await axios.get<ISurveyDetailReceive>(
    `${process.env.API}/survey/${id}`
  );
  return data;
}

export async function updateSurvey(id: string, payload: ISurveyUpdateRequest) {
  const { data } = await axios.put<ISurveyCreateReceive>(
    `${process.env.API}/survey/${id}`,
    payload
  );
  return data;
}
