import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import Health from "./components/health";

const queryCache = new QueryCache();

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Health />
    </ReactQueryCacheProvider>
  );
}
