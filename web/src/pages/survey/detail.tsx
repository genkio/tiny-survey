import { ISurvey } from "common/types";
import React from "react";
import { useParams } from "react-router-dom";
import SurveyDetail from "../../containers/survey/detail";

export default function SurveyDetailPage() {
  const { id } = useParams<{ id: ISurvey["id"] }>();

  return <SurveyDetail id={id} />;
}
