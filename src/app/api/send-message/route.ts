import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { uid, cid, message }: { uid: string; cid: string; message: string } =
      await req.json();

    if (!uid) return new Response("Unauthorized", { status: 401 });
    if (!cid) return new Response("Unauthorized", { status: 401 });
    if (!message)
      return new Response("The message can't be empty.", { status: 400 });

    await prisma.message.create({
      data: {
        message,
        userId: parseInt(uid),
        chatId: cid,
      },
    });
    await prisma.$disconnect();
    return new Response("Message sent");
  } catch (error) {}
}
