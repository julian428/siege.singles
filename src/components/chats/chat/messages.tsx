"use client";

import { useEffect, useState } from "react";
import Message from "./message";
import { pusherClient } from "@/lib/pusher";

interface initMessage {
  message: string;
  User: {
    id: number;
    image: string;
    name: string;
  } | null;
}

interface Props {
  initialMessages: initMessage[];
  uid: string;
  cid: string;
}

export default function Messages({ initialMessages, uid, cid }: Props) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    pusherClient.subscribe(`chat-${cid}`);

    pusherClient.bind("incoming-message", (message: initMessage) => {
      const newState = [...messages, message];
      setMessages(newState);
    });

    return () => {
      pusherClient.unsubscribe(`chat-${cid}`);
    };
  }, []);

  return (
    <article className="h-full w-full p-4 flex flex-col-reverse gap-8 max-h-full overflow-y-auto">
      {messages.map((message) => (
        <Message
          key={message.User?.id + "" + Math.random()}
          message={message}
          uid={uid}
        />
      ))}
    </article>
  );
}
