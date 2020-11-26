import { useContext } from "react";
import { FactoryContext } from "../components/form/factory-context";

export function useFactory() {
  const context = useContext(FactoryContext);
  if (context === undefined) {
    throw new Error(`useFactory must be used within a FactoryProvider`);
  }
  return context;
}
