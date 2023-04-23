import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const {
      uid,
      cid,
      message,
      name,
      image,
    }: {
      uid: string;
      cid: string;
      message: string;
      name: string;
      image: string;
    } = await req.json();

    if (!uid) return new Response("Unauthorized", { status: 401 });
    if (!name || !image) return new Response("Unauthorized", { status: 401 });
    if (!cid) return new Response("Unauthorized", { status: 401 });
    if (!message)
      return new Response("The message can't be empty.", { status: 400 });

    const m = {
      message,
      User: {
        id: parseInt(uid),
        image,
        name,
      },
    };

    pusherServer.trigger(`chat-${cid}`, "incoming-message", m);

    await prisma.message.create({
      data: {
        message,
        userId: parseInt(uid),
        chatId: cid,
      },
    });
    await prisma.$disconnect();
    return new Response("Message sent");
  } catch (error) {
    return new Response("Something went wrong. Try again later.", {
      status: 500,
    });
  }
}
