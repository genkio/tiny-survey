import axios from "axios";
import { HealthStatusReceive } from "common/types";
import { HealthStatusRequestKey, useFetch } from "./use-fetch";

const getHealthStatus = async () => {
  const { data } = await axios.get<HealthStatusReceive>(`${process.env.API}/health/now`);
  return data;
};

export function useHealth() {
  return useFetch<HealthStatusRequestKey, HealthStatusReceive>("health", getHealthStatus);
}
