"use client";

import { FormEvent, useRef, useState } from "react";
import StandardButton from "../ui/button";
import { signIn } from "next-auth/react";
import StandardInput from "../ui/input";
import { LoadingIcon } from "@/lib/icons";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    signIn("credentials", {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      redirect: true,
      callbackUrl: "/singles/match",
    });
  };

  return (
    <form
      onSubmit={signInHandler}
      className="max-w-md flex flex-col items-center gap-8"
    >
      <StandardInput
        ref={emailRef}
        label="email"
        type="email"
        required
      />
      <StandardInput
        ref={passwordRef}
        label="password"
        type="password"
        required
      />
      <StandardButton className="w-32 h-14">
        {isLoading ? (
          <LoadingIcon className="text-action animate-spin" />
        ) : (
          "Login"
        )}
      </StandardButton>
    </form>
  );
}
