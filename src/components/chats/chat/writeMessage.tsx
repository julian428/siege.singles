"use client";

import { LoadingIcon, SendIcon } from "@/lib/icons";
import axios from "axios";
import { useRef, useState } from "react";

interface Props {
  uid: string;
  cid: string;
}

export default function WriteMessage({ uid, cid }: Props) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    const message = messageRef.current?.value;
    if (!message) return;
    setIsSending(true);
    await axios.post("/api/send-message", { uid, cid, message });
    messageRef.current.value = "";
    setIsSending(false);
  };

  return (
    <div className="bg-secondary bg-opacity-10 h-72 w-full px-8 py-4">
      <div className="relative h-full max-w-xl m-auto">
        <textarea
          ref={messageRef}
          disabled={isSending}
          className="resize-none bg-transparent border-2 border-secondary rounded-lg p-2 outline-none text-secondary max-w-xl text-2xl w-full h-full pr-8 no-scroll"
        />
        <button onClick={sendMessage}>
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
