import React, { PropsWithChildren } from "react";

export default function PageWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
