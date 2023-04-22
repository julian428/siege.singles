"use client";

import { useState } from "react";
import Message from "./message";

interface Props {
  initialMessages: {
    createdat: Date;
    message: string;
    User: {
      id: number;
      image: string;
      name: string;
    } | null;
  }[];
  uid: string;
}

export default function Messages({ initialMessages, uid }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  return (
    <article className="h-full w-full p-4">
      {messages.map((message) => (
        <Message
          key={message.createdat + ""}
          message={message}
          uid={uid}
        />
      ))}
    </article>
  );
}
