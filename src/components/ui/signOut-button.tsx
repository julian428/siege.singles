"use client";

import { signOut } from "next-auth/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function SignOutButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      onClick={() => signOut()}
    >
      {children}
    </button>
  );
}
