import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { type Session, getServerSession } from "next-auth";
import Link from "next/link";

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
  });
  await prisma.$disconnect();
  return (
    <article className="flex justify-evenly p-2">
      {chats.map((chat) => (
        <Link
          className="p-2 bg-secondary text-main w-fit"
          key={chat.id}
          href={`/singles/chats/${chat.id}`}
        >
          {chat.id}
        </Link>
      ))}
    </article>
  );
}
