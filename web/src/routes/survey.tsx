import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import SurveyDetailPage from "../pages/survey/detail";
import SurveyEditPage from "../pages/survey/edit";

export default function SurveyRoutes({ match: { path } }: RouteComponentProps) {
  return (
    <Switch>
      <Route exact path={`${path}/:id`} component={SurveyDetailPage} />
      <Route path={`${path}/:id/edit`} component={SurveyEditPage} />
    </Switch>
  );
}
