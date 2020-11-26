import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../pages/home";
import NotFoundPage from "../pages/not-found";
import ResponseRoutes from "./response";
import SurveyRoutes from "./survey";

export default function Routes() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route path="/survey" render={(props) => <SurveyRoutes {...props} />} />
        <Route
          path="/response"
          render={(props) => <ResponseRoutes {...props} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
