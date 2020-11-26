import React, { createContext, PropsWithChildren, useState } from "react";

interface IFactoryContext {
  add: () => void;
  initialize: (count: number) => void;
  items: number[];
  remove: (index: number) => void;
}

export const FactoryContext = createContext<IFactoryContext | undefined>(
  undefined
);

export default function FactoryProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [items, setItems] = useState([0]);

  return (
    <FactoryContext.Provider
      value={{
        add: () => {
          setItems([...items, items.length + 1]);
        },
        initialize: (count: number) => {
          const newItems = Array(count)
            .fill(0)
            .map((v, i) => v + 1 * i);
          setItems(newItems);
        },
        items,
        remove: (index: number) => {
          if (items.length === 1) return;
          setItems(items.filter((i) => i !== index));
        },
      }}
    >
      {children}
    </FactoryContext.Provider>
  );
}
