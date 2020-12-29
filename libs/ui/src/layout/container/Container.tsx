import * as React from "react";
import classNames from "classnames";

export interface ContainerProps {
  isPrimary?: boolean;
}

export function Container({
  children,
  isPrimary,
}: React.PropsWithChildren<ContainerProps>) {
  const className = classNames("container", {
    "is-primary": isPrimary,
  });

  return <section className={className}>{children}</section>;
}
