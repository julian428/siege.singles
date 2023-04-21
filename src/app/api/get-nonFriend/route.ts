import prisma from "@/lib/db";
import { getNonFriend } from "@/lib/utils";
import { isNumber } from "@/validators/types";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();
    if (!uid) return new Response("No user id provided", { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(uid),
      },
      select: {
        friendIds: true,
      },
    });

    if (!user)
      return new Response("Something went wrong please log in again.", {
        status: 401,
      });

    const nonFriend = await getNonFriend(uid, user.friendIds);

    return new Response(JSON.stringify(nonFriend));
  } catch (error) {
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
