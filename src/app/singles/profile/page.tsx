import { authOptions } from "@/lib/auth";
import { DeathIcon, GameIcon, KillIcon, TimeIcon, WinIcon } from "@/lib/icons";
import getStats from "@/lib/stats";
import { type Session, getServerSession } from "next-auth";
import Image from "next/image";

export const metadata = {
  title: "Siege Singles | Profile",
};

export default async function ProfilePage() {
  const session = (await getServerSession(authOptions)) as Session;
  const stats = await getStats(session.user.username);
  return (
    <article>
      <header className="md:h-64 h-32 w-full bg-action relative">
        <div className="absolute flex md:-bottom-14 -bottom-6 right-4 items-center gap-4 md:gap-8">
          <h1 className="md:text-6xl text-3xl">{session.user.name}</h1>
          <Image
            src={session.user.image}
            alt={session.user.name + " profile picture"}
            width={100}
            height={100}
            className="rounded-full md:w-48 md:h-48 w-24 h-24"
          />
        </div>
      </header>
      <article className="font-mono mt-8 md:mt-0 px-4 md:px-0 text-xl flex gap-y-4 flex-wrap justify-evenly items-center h-[calc(100vh-16rem)]">
        <aside className="bg-secondary bg-opacity-10 p-4 rounded-lg text-center flex-grow max-w-sm">
          <h2 className="font-black text-3xl mb-4">Description</h2>
          <p className="break-all">{session.user.description}</p>
        </aside>
        <aside className="flex flex-col gap-8 bg-secondary bg-opacity-10 flex-grow max-w-sm items-center p-4 rounded-lg text-center">
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
              <article className="flex items-center max-w-xs flex-wrap flex-grow gap-8 text-2xl justify-center">
                <section className="flex flex-col items-center">
                  <h4 className="text-xs">Rankeds played</h4>
                  <section className="flex items-center gap-2">
                    <GameIcon />
                    <p>{stats.games}</p>
                  </section>
                </section>
                <section className="flex flex-col items-center">
                  <h4 className="text-xs">Win %</h4>
                  <section className="flex items-center gap-2">
                    <WinIcon />
                    <p>{stats.wr}</p>
                  </section>
                </section>
                <section className="flex flex-col items-center">
                  <h4 className="text-xs">KD</h4>
                  <section className="flex items-center gap-2">
                    <section className="flex">
                      <KillIcon /> <DeathIcon />
                    </section>
                    <p>{stats.kd}</p>
                  </section>
                </section>
                <section className="flex flex-col items-center">
                  <h4 className="text-xs">Kills per ranked</h4>
                  <section className="flex items-center gap-2">
                    <section className="flex">
                      <KillIcon /> <GameIcon />
                    </section>
                    <p>{stats.km}</p>
                  </section>
                </section>
                <section className="flex flex-col items-center">
                  <h4 className="text-xs">Time played</h4>
                  <section className="flex items-center gap-2">
                    <TimeIcon />
                    <p>{stats.time}</p>
                  </section>
                </section>
              </article>
            </>
          ) : (
            <p>Player has no stats</p>
          )}
        </aside>
      </article>
    </article>
  );
}
