import { ISurvey } from "common/types";
import React from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../components/page-wrapper";
import SurveyDetail from "../../containers/survey/detail";

export default function SurveyDetailPage() {
  const { id } = useParams<{ id: ISurvey["id"] }>();

  return (
    <PageWrapper>
      <SurveyDetail id={id} />
    </PageWrapper>
  );
}
