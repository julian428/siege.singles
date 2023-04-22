import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { uid, pid }: { uid: number; pid: number } = await req.json();

    if (!uid) return new Response("Unauthorized", { status: 401 });
    if (!pid)
      return new Response("Something went wrong. PLease try again later.", {
        status: 500,
      });

    await prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        dislikedIds: {
          push: pid.toString(),
        },
      },
    });
    return new Response("Added players to disliked group");
  } catch (error) {
    return new Response("Couldn't update user. Please try again later.", {
      status: 500,
    });
  }
}
