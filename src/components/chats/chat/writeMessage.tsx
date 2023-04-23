"use client";

import { LoadingIcon, SendIcon } from "@/lib/icons";
import axios from "axios";
import { KeyboardEvent, useRef, useState } from "react";

interface Props {
  uid: string;
  cid: string;
  name: string;
  image: string;
}

export default function WriteMessage({ uid, cid, name, image }: Props) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.shiftKey) return;
    if (event.altKey) return;
    if (event.ctrlKey) return;
    if (event.key !== "Enter") return;
    event.preventDefault();
    const message = messageRef.current?.value;
    if (!message || message.trim().length === 0) return;
    sendMessage();
  };

  const sendMessage = async () => {
    const message = messageRef.current?.value;
    if (!message) return;
    setIsSending(true);
    await axios.post("/api/send-message", { uid, cid, message, name, image });
    messageRef.current.value = "";
    setIsSending(false);
  };

  return (
    <div className="bg-secondary bg-opacity-10 md:h-72 w-full px-8 py-4">
      <div className="relative h-full max-w-xl m-auto">
        <textarea
          ref={messageRef}
          disabled={isSending}
          onKeyDown={keyDownHandler}
          className="resize-none transition-colors duration-500 bg-secondary bg-opacity-75 rounded-lg p-2 z-10 outline-none text-main max-w-xl text-2xl w-full h-full pr-8 no-scroll"
        />
        <button
          onClick={sendMessage}
          className="text-main"
        >
          {isSending ? (
            <LoadingIcon className="animate-spin absolute right-1 bottom-3 text-2xl" />
          ) : (
            <SendIcon className="absolute right-1 bottom-3 -rotate-45 text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
}
