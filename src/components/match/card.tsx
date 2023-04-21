"use client";

import Image from "next/image";
import Swiper from "./swiper";
import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import type { Session } from "next-auth";
import axios from "axios";

interface NonFriendType {
  name: string;
  username: string;
  image: string;
  description: string;
}

interface Props {
  session: Session;
}

export default function Card({ session }: Props) {
  const [user, setUser] = useState<NonFriendType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.post("/api/get-nonFriend", {
        uid: session.user.id,
      });
      setUser(res.data);
    };
    fetchUser();
  }, [session]);

  if (!user) {
    return <LoaderIcon className="animate-spin" />;
  }

  return (
    <div>
      <article className="w-[512px] h-[512px] relative">
        <Image
          src={user.image}
          alt={`${user.name} profile picture`}
          fill
        />
        <section className="absolute top-0 left-1/2 text-center text-3xl -translate-x-1/2 pt-2">
          {user.name}
        </section>
        <section className="absolute bottom-0 w-full bg-main bg-opacity-50 text-center">
          {user.description}
        </section>
      </article>
      <Swiper />
    </div>
  );
}
