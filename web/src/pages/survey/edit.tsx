import { ISurvey } from "@libs/common/model";
import React from "react";
import { useParams } from "react-router-dom";
import FactoryProvider from "../../components/form/factory-context";
import PageWrapper from "../../components/page-wrapper";
import SurveyEdit from "../../containers/survey/edit";

export default function SurveyEditPage() {
  const { id } = useParams<{ id: ISurvey["id"] }>();

  return (
    <PageWrapper>
      <FactoryProvider>
        <SurveyEdit id={id} />
      </FactoryProvider>
    </PageWrapper>
  );
}
