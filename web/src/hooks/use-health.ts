import axios from "axios";
import { IHealthStatusReceive } from "common/types";
import { useFetch } from "./use-fetch";

const getHealthStatus = async () => {
  const { data } = await axios.get<IHealthStatusReceive>(`${process.env.API}/health/now`);
  return data;
};

export function useHealth() {
  return useFetch<IHealthStatusReceive>("health", getHealthStatus);
}
