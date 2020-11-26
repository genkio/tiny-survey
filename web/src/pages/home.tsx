import React from "react";
import FactoryProvider from "../components/form/factory-context";
import SurveyCreate from "../containers/survey/create";

export default function HomePage() {
  return (
    <FactoryProvider>
      <SurveyCreate />
    </FactoryProvider>
  );
}
