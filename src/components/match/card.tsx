"use client";

import Image from "next/image";
import Swiper from "./swiper";
import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import type { Session } from "next-auth";
import axios from "axios";

interface NonFriendType {
  id: number;
  name: string;
  username: string;
  image: string;
  description: string;
}

interface Props {
  session: Session;
}

export default function Card({ session }: Props) {
  const [user, setUser] = useState<NonFriendType | null | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios({
        method: "post",
        url: `/api/get-nonFriend?${new Date().getTime()}`,
        data: { uid: session.user.id },
      });
      setUser(res.data);
    };
    fetchUser();
  }, [session]);

  if (user === undefined) {
    return <LoaderIcon className="animate-spin" />;
  }

  if (user === null) {
    return <p>No more users to match with.</p>;
  }

  return (
    <div>
      <article className="w-[512px] h-[512px] relative">
        <Image
          src={user.image}
          alt={`${user.name} profile picture`}
          fill
        />
        <section className="absolute bottom-0 w-full bg-main bg-opacity-50 text-center">
          {user.description}
        </section>
      </article>
      <Swiper
        name={user.name}
        uid={parseInt(session.user.id)}
        pid={user.id}
      />
    </div>
  );
}
