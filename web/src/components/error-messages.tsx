import React from "react";

export default function ErrorMessages({ messages }: { messages: string[] }) {
  if (!messages || !messages.length) return null;

  return (
    <div className="message is-danger">
      <div className="message-body">
        {messages.map((message, index) => (
          <p key={`ErrorMessage-${index}`}>{message}</p>
        ))}
      </div>
    </div>
  );
}
