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

export function randomHexColor(opacity: boolean) {
  const chars = "0123456789ABCDEF";
  const length = opacity ? 8 : 6;
  let hexCode = "";
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.random() * chars.length;
    hexCode += chars.charAt(randomNumber);
  }
  return hexCode;
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
