import { ISurvey } from "common/types";
import React from "react";
import { useParams } from "react-router-dom";
import FactoryProvider from "../../components/form/factory-context";
import SurveyEdit from "../../containers/survey/edit";

export default function SurveyEditPage() {
  const { id } = useParams<{ id: ISurvey["id"] }>();

  return (
    <FactoryProvider>
      <SurveyEdit id={id} />
    </FactoryProvider>
  );
}
