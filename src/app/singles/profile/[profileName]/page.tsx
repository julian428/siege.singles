import prisma from "@/lib/db";
import { DeathIcon, GameIcon, KillIcon, TimeIcon, WinIcon } from "@/lib/icons";
import getStats from "@/lib/stats";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    profileName: string;
  };
}

export const metadata = {
  title: "Siege Singles | Profile",
};

export default async function ProfilePage({ params }: Props) {
  const profile = await prisma.user.findUnique({
    where: {
      name: params.profileName,
    },
    select: {
      username: true,
      name: true,
      image: true,
      description: true,
    },
  });
  await prisma.$disconnect();
  if (!profile) notFound();
  const stats = await getStats(profile.username);
  return (
    <article>
      <header className="h-64 w-full bg-action relative">
        <div className="absolute flex -bottom-14 right-4 items-center gap-8">
          <h1 className="text-6xl">{profile.name}</h1>
          <Image
            src={profile.image}
            alt={profile.name + " profile picture"}
            width={100}
            height={100}
            className="rounded-full w-48 h-48"
          />
        </div>
      </header>
      <article className="font-mono text-xl flex justify-evenly items-center h-[calc(100vh-16rem)] relative">
        <aside className="bg-secondary bg-opacity-10 p-4 rounded-lg text-center max-w-xs">
          <h2 className="font-black text-3xl mb-4">Description</h2>
          <p className="break-all">{profile.description}</p>
        </aside>
        <aside className="flex flex-col gap-8 bg-secondary bg-opacity-10 p-4 rounded-lg text-center">
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
