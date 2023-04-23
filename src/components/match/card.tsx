"use client";

import Image from "next/image";
import Swiper from "./swiper";
import { useEffect, useState } from "react";
import SadFace from "../../assets/frankenstein.png";
import type { Session } from "next-auth";
import axios from "axios";
import LoadingCard from "./loadingCard";

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
        url: `/api/get-nonFriend`,
        data: { uid: session.user.id },
      });
      setUser(res.data);
    };
    fetchUser();
  }, [session]);

  if (!user) {
    return (
      <LoadingCard>
        {user === undefined ? null : (
          <>
            <Image
              src={SadFace}
              alt="Art by Mohamed atho"
              width={100}
              height={100}
            />
            <p className="text-2xl text-main">No more users to match with.</p>
          </>
        )}
      </LoadingCard>
    );
  }

  return (
    <div>
      <article className="md:w-[512px] md:h-[512px] w-[90vw] h-[90vw] relative">
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
