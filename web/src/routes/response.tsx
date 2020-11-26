import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ResponseDetailPage from "../pages/response/detail";

export default function ResponseRoutes({
  match: { path },
}: RouteComponentProps) {
  return (
    <Switch>
      <Route path={`${path}/:id`} component={ResponseDetailPage} />
    </Switch>
  );
}
