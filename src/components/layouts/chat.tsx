import { FriendType } from "@/app/singles/chats/[chatId]/layout";
import { DeathIcon, GameIcon, KillIcon, TimeIcon, WinIcon } from "@/lib/icons";
import type { StatsType } from "@/lib/stats";
import Image from "next/image";
import Link from "next/link";

interface Props {
  friend: FriendType;
  stats: StatsType | null;
}

export default function ChatNav({ friend, stats }: Props) {
  return (
    <aside className="h-screen w-80 bg-secondary bg-opacity-10 hidden md:flex flex-col items-center py-4 gap-8">
      <header className="flex flex-col gap-4 items-center">
        <Image
          src={friend.image}
          alt={`${friend.name} profile picture`}
          width={100}
          height={100}
          className="rounded-full w-32 h-32"
        />
        <Link href={`/singles/profile/${friend.name}`}>
          <h2 className="text-center capitalize text-3xl duration-500 hover:text-action">
            {friend.name}
          </h2>
        </Link>
      </header>
      <article className="text-center break-all">{friend.description}</article>
      <article className="mt-24 flex flex-col items-center gap-4 font-mono font-semibold">
        {stats !== null ? (
          <>
            <header className="flex flex-col items-center">
              <Image
                src={stats.rank.url}
                alt={stats.rank.name}
                width={80}
                height={80}
              />
              <p className="font-black tracking-wide text-xl">
                {stats.rank.mmr}
              </p>
            </header>
            <article className="flex flex-col items-center">
              <section className="flex items-center gap-2">
                <GameIcon />
                <p>{stats.games}</p>
              </section>

              <section className="flex items-center gap-2">
                <WinIcon />
                <p>{stats.wr}</p>
              </section>
              <section className="flex items-center gap-2">
                <section className="flex">
                  <KillIcon /> <DeathIcon />
                </section>
                <p>{stats.kd}</p>
              </section>
              <section className="flex items-center gap-2">
                <section className="flex">
                  <KillIcon /> <GameIcon />
                </section>
                <p>{stats.km}</p>
              </section>
              <section className="flex items-center gap-2">
                <TimeIcon />
                <p>{stats.time}</p>
              </section>
            </article>
          </>
        ) : (
          <p>Player has no stats</p>
        )}
      </article>
    </aside>
  );
}
