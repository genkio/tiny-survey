import { Message } from "bulma";
import React from "react";

export default function ErrorMessages({ messages }: { messages: string[] }) {
  if (!messages || !messages.length) return null;

  return (
    <Message isDanger>
      <Message.Body>
        {messages.map((message, index) => (
          <p key={`ErrorMessage-${index}`}>{message}</p>
        ))}
      </Message.Body>
    </Message>
  );
}
