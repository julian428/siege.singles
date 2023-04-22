"use client";

import { HateIcon, LikeIcon } from "@/lib/icons";
import axios from "axios";

interface Props {
  name: string;
  uid: number;
  pid: number;
}

export default function Swiper({ name, uid, pid }: Props) {
  const dislikeHandler = async () => {
    await axios.post("/api/swipe/left", { uid, pid });
    window.location.reload();
  };
  const likeHandler = async () => {
    await axios.post("/api/swipe/right", { uid, pid });
    window.location.reload();
  };
  return (
    <nav className="flex text-7xl justify-between p-8 items-center">
      <button onClick={dislikeHandler}>
        <HateIcon />
      </button>
      <h3 className="text-3xl">{name}</h3>
      <button>
        <LikeIcon onClick={likeHandler} />
      </button>
    </nav>
  );
}
