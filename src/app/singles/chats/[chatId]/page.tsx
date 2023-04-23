import Messages from "@/components/chats/chat/messages";
import WriteMessage from "@/components/chats/chat/writeMessage";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { type Session, getServerSession } from "next-auth";

interface Props {
  params: {
    chatId: string;
  };
}

export const metadata = {
  title: "Siege Siengles | Chat",
};

export default async function ChatPage({ params }: Props) {
  const session = (await getServerSession(authOptions)) as Session;
  const messages = await prisma.message.findMany({
    where: {
      chatId: params.chatId,
    },
    orderBy: {
      createdat: "desc",
    },
    select: {
      User: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      message: true,
    },
  });
  await prisma.$disconnect();
  return (
    <article className="h-screen flex flex-col flex-grow">
      <Messages
        initialMessages={messages}
        uid={session.user.id}
        cid={params.chatId}
      />
      <WriteMessage
        uid={session.user.id}
        name={session.user.name}
        image={session.user.image}
        cid={params.chatId}
      />
    </article>
  );
}
