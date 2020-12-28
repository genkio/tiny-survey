import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import Routes from "./routes";
import "./styles/index.css";

const queryCache = new QueryCache();

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Routes />
    </ReactQueryCacheProvider>
  );
}
