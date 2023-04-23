import ChatNav from "@/components/layouts/chat";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import getStats from "@/lib/stats";
import { Session, getServerSession } from "next-auth";
import type { ReactNode } from "react";

export interface FriendType {
  image: string;
  id: number;
  description: string;
  name: string;
  username: string;
}

interface Props {
  children: ReactNode;
  params: {
    chatId: string;
  };
}

export default async function ChatLayout({ children, params }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  const chat = await prisma.chat.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      users: {
        select: {
          id: true,
          description: true,
          image: true,
          name: true,
          username: true,
        },
        where: {
          id: {
            not: parseInt(session.user.id),
          },
        },
      },
    },
  });
  const friend = chat?.users[0] as FriendType;
  await prisma.$disconnect();

  const stats = await getStats(friend.username);

  return (
    <article className="flex w-full md:h-screen">
      {children}
      <ChatNav
        friend={friend}
        stats={stats}
      />
    </article>
  );
}
