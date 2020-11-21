import { QueryFunction, useQuery } from "react-query";

const queryKeys = ["health"] as const;
type QueryKey = typeof queryKeys[number];

/**
 * A simple wrapper for useQuery, to enable typed query key
 */
export function useFetch<T extends unknown>(queryKey: QueryKey, fn: QueryFunction<T>) {
  return useQuery<T>([queryKey], fn);
}
