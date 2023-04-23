"use client";

import { HateIcon, LikeIcon } from "@/lib/icons";
import axios from "axios";
import { useState } from "react";

interface Props {
  name: string;
  uid: number;
  pid: number;
}

export default function Swiper({ name, uid, pid }: Props) {
  const [loading, setLoading] = useState(false);

  const dislikeHandler = async () => {
    setLoading(true);
    await axios.post("/api/swipe/left", { uid, pid });
    window.location.reload();
  };
  const likeHandler = async () => {
    setLoading(true);
    await axios.post("/api/swipe/right", { uid, pid });
    window.location.reload();
  };
  return (
    <nav className="flex text-7xl justify-between p-8 items-center">
      <button
        disabled={loading}
        onClick={dislikeHandler}
      >
        <HateIcon />
      </button>
      <h3 className="text-3xl">{name}</h3>
      <button
        disabled={loading}
        onClick={likeHandler}
      >
        <LikeIcon />
      </button>
    </nav>
  );
}
