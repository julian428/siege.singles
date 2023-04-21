import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number = 1000) =>
  new Promise((r) => setTimeout(r, ms));

export function codeGen(length: number) {
  const chars = "0123456789qwertyuiopasdfghjklzxcvbnm";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.random() * chars.length;
    code += chars.charAt(randomNumber);
  }
  return code;
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export async function getNonFriend(uid: string, friends: string[]) {
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
