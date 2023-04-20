import Card from "@/components/match/card";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Sige Singles | match",
};

async function getNonFriends(uid: string, friends: string[]) {
  const intFriends = friends.map((id) => parseInt(id));
  const nonFriend = await prisma.user.findFirst({
    where: {
      id: { not: parseInt(uid) },
      active: true,
      NOT: {
        id: { in: intFriends },
        friendIds: { hasSome: uid },
      },
    },
    select: {
      name: true,
      username: true,
      image: true,
      description: true,
    },
  });
  prisma.$disconnect();
  return nonFriend;
}

export default async function MatchPage() {
  const session = await getServerSession(authOptions);
  const possibleMatch = await getNonFriends(
    session!.user.id,
    session!.user.friendIds
  );
  if (!possibleMatch) {
    return <center>Nobody to match with. Try again later.</center>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card user={possibleMatch} />
    </div>
  );
}
