import PageTitle from "@/components/ui/title";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { type Session, getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Siege Singles | Chats",
};

export default async function ChatsPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: parseInt(session.user.id),
        },
      },
    },
    orderBy: {
      updatedat: "desc",
    },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  return (
    <>
      <PageTitle
        className="text-center border-b-2 mb-4"
        label="Chats"
      />
      <article className="flex justify-evenly flex-wrap p-2">
        {chats.map((chat) => {
          const friend = chat.users.find(
            (user) => user.id.toString() !== session.user.id
          );
          return (
            <Link
              className="px-8 py-4 hover:bg-action duration-500 flex gap-8 items-center bg-secondary text-main w-fit rounded-lg"
              key={chat.id}
              href={`/singles/chats/${chat.id}`}
            >
              <Image
                src={friend?.image || ""}
                alt={friend?.name + " profile picture"}
                width={100}
                height={100}
                className="rounded-full h-24 w-24"
              />
              <h3 className="text-3xl">{friend?.name}</h3>
            </Link>
          );
        })}
      </article>
    </>
  );
}
