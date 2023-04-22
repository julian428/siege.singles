import prisma from "@/lib/db";

async function getNonFriend(
  uid: string,
  friends: string[],
  disliked: string[]
) {
  const intFriends = friends.map((id) => parseInt(id));
  const intDisliked = disliked.map((id) => parseInt(id));
  const nonFriend = await prisma.user.findFirst({
    where: {
      id: { not: parseInt(uid), notIn: intDisliked },
      active: true,
      NOT: {
        id: { in: intFriends },
        friendIds: { hasSome: uid },
        dislikedIds: { hasSome: uid },
      },
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      description: true,
    },
  });
  prisma.$disconnect();
  return nonFriend;
}

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
        dislikedIds: true,
      },
    });

    if (!user)
      return new Response("Something went wrong please log in again.", {
        status: 401,
      });

    const nonFriend = await getNonFriend(uid, user.friendIds, user.dislikedIds);

    return new Response(JSON.stringify(nonFriend));
  } catch (error) {
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}
