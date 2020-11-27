import "bulma";
import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import "./app.css";
import Routes from "./routes";

const queryCache = new QueryCache();

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Routes />
    </ReactQueryCacheProvider>
  );
}
