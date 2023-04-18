"use client";

import { signOut } from "next-auth/react";
import StandardButton from "./button";

export default function SignOutButton() {
  return <StandardButton onClick={() => signOut()}>SignOut</StandardButton>;
}
