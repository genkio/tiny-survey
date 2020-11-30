import {
  IResponseCreateReceive,
  IResponseCreateRequest,
  IResponseDetailReceive,
} from "common/types";
import axiosApiInstance from "./base";

export async function createResponse(payload: IResponseCreateRequest) {
  const { data } = await axiosApiInstance.post<IResponseCreateReceive>(
    `${process.env.API}/response`,
    payload
  );
  return data;
}

export async function getResponse(_key: string, id: string) {
  const { data } = await axiosApiInstance.get<IResponseDetailReceive>(
    `${process.env.API}/response/${id}`
  );
  return data;
}
