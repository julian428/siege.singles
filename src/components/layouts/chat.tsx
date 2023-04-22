import { FriendType } from "@/app/singles/chats/[chatId]/layout";
import { DeathIcon, GameIcon, KillIcon, TimeIcon, WinIcon } from "@/lib/icons";
import Image from "next/image";
import { StatsRank } from "r6s-stats-api/types/rank";

interface Props {
  friend: FriendType;
  stats: StatsRank | string;
}

export default function ChatNav({ friend, stats }: Props) {
  return (
    <aside className="h-screen w-80 bg-secondary bg-opacity-10 flex flex-col items-center py-4 gap-8">
      <header className="flex flex-col gap-4 items-center">
        <Image
          src={friend.image}
          alt={`${friend.name} profile picture`}
          width={100}
          height={100}
          className="rounded-full w-32 h-32"
        />
        <h2 className="text-center capitalize text-3xl">{friend.name}</h2>
      </header>
      <article className="text-center break-all">{friend.description}</article>
      <article className="mt-24 flex flex-col items-center gap-4 font-mono font-semibold">
        {typeof stats !== "string" ? (
          <>
            <header className="flex flex-col items-center">
              <Image
                src={stats.rank_img}
                alt={stats.rank}
                width={80}
                height={80}
              />
              <p className="font-black tracking-wide text-xl">{stats.mmr}</p>
            </header>
            <article className="flex flex-col items-center">
              <section className="flex items-center gap-2">
                <GameIcon />
                <p>{stats.matches}</p>
              </section>

              <section className="flex items-center gap-2">
                <WinIcon />
                <p>{stats.win_}</p>
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
                <p>{stats.kills_match}</p>
              </section>
              <section className="flex items-center gap-2">
                <TimeIcon />
                <p>{stats.time_played}</p>
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
