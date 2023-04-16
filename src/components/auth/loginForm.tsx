"use client";

import { FormEvent, useRef, useState } from "react";
import StandardButton from "../ui/button";
import { signIn } from "next-auth/react";
import StandardInput from "../ui/input";
import { LoadingIcon } from "@/lib/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signInHandler = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });
      if (response?.error) throw new Error("Invalid email or password.");
      router.push("/singles/match");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={signInHandler}
      className="max-w-md flex flex-col items-center gap-8"
    >
      <StandardInput
        ref={emailRef}
        label="Email"
        type="email"
        required
      />
      <StandardInput
        ref={passwordRef}
        label="Password"
        type="password"
        required
      />
      <footer className="flex gap-2">
        <p>Don't have an account?</p>
        <Link
          className="font-bold underline text-action"
          href="/auth/signup"
        >
          SignUp
        </Link>
      </footer>
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
