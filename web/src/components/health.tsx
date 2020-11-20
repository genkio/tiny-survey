import React from "react";
import { useHealth } from "../hooks";

export default function Health() {
  const { data, error, status } = useHealth();

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Oops</p>;

  return <p>{data?.now}</p>;
}
