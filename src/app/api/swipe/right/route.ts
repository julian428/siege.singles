import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { uid, pid }: { uid: number; pid: number } = await req.json();
    if (!uid) return new Response("Unauthorized", { status: 401 });
    if (!pid)
      return new Response("Something went wrong. Please try again later.", {
        status: 500,
      });

    await prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        friendIds: {
          push: pid.toString(),
        },
      },
    });

    const player = await prisma.user.findUnique({
      where: {
        id: pid,
      },
      select: {
        friendIds: true,
      },
    });

    if (player?.friendIds.includes(uid.toString())) {
      await prisma.chat.create({
        data: {
          users: {
            connect: [{ id: pid }, { id: uid }],
          },
        },
      });
    }

    await prisma.$disconnect();

    return new Response("Added player to friends.");
  } catch (error) {
    return new Response("Couldn't update user.", { status: 500 });
  }
}
