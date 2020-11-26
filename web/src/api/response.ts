import axios from "axios";
import {
  IResponseCreateReceive,
  IResponseCreateRequest,
  IResponseDetailReceive,
} from "common/types";

export async function createResponse(payload: IResponseCreateRequest) {
  const { data } = await axios.post<IResponseCreateReceive>(
    `${process.env.API}/response`,
    payload
  );
  return data;
}

export async function getResponse(_key: string, id: string) {
  const { data } = await axios.get<IResponseDetailReceive>(
    `${process.env.API}/response/${id}`
  );
  return data;
}
