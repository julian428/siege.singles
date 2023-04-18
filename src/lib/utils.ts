import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number = 1000) =>
  new Promise((r) => setTimeout(r, ms));

export function codeGen(length: number) {
  const numbers = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.random() * numbers.length;
    code += numbers.charAt(randomNumber);
  }
  return code;
}
