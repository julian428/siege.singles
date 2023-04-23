import SinglesNav from "@/components/layouts/singles";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { type Session, getServerSession } from "next-auth";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function SinglesLayout({ children }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  const rawChats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          id: parseInt(session.user.id),
        },
      },
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
  const chats = rawChats.map((chat) => {
    const id = chat.id;
    const friend = chat.users.find((user) => {
      if (user.id.toString() !== session.user.id) {
        return user;
      }
    });
    return { id, image: friend!.image, name: friend!.name };
  });
  return (
    <main className="flex h-screen overflow-hidden">
      <SinglesNav userChats={chats} />
      <article className="overflow-y-auto max-h-screen w-full">
        {children}
      </article>
    </main>
  );
}
