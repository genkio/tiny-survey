import { QueryFunction, useQuery } from "react-query";

/**
 * A simple wrapper for useQuery, to enable typed query key
 */
export function useFetch<K extends string, T extends object>(queryKey: K, fn: QueryFunction<T>) {
  return useQuery<T>([queryKey], fn);
}

export type HealthStatusRequestKey = "health";
