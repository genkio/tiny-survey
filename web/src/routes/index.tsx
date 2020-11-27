import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignInPage from "../pages/auth/sign-in";
import NotFoundPage from "../pages/not-found";
import ResponseRoutes from "./response";
import SurveyRoutes from "./survey";

export default function Routes() {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route component={SignInPage} exact path="/" />
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
