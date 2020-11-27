import React from "react";
import FactoryProvider from "../../components/form/factory-context";
import PageWrapper from "../../components/page-wrapper";
import SurveyCreate from "../../containers/survey/create";

export default function SurveyCreatePage() {
  return (
    <PageWrapper>
      <FactoryProvider>
        <SurveyCreate />
      </FactoryProvider>
    </PageWrapper>
  );
}
