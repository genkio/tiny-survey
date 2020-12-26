import * as React from "react";
import classNames from "classnames";

export function MessageHeader({ children }: React.PropsWithChildren<unknown>) {
  return <div className="message-header">{children}</div>;
}

export function MessageBody({ children }: React.PropsWithChildren<unknown>) {
  return <div className="message-body">{children}</div>;
}

export interface MessageProps {
  isDanger?: boolean;
}

export function Message({
  children,
  isDanger,
}: React.PropsWithChildren<MessageProps>) {
  const className = classNames("message", {
    "is-danger": isDanger,
  });

  return <article className={className}>{children}</article>;
}

Message.Header = MessageHeader;
Message.Body = MessageBody;
