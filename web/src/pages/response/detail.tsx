import { IResponse } from "common/types";
import React from "react";
import { useParams } from "react-router-dom";
import ResponseDetail from "../../containers/response/detail";

export default function ResponseDetailPage() {
  const { id } = useParams<{ id: IResponse["id"] }>();

  return <ResponseDetail id={id} />;
}
