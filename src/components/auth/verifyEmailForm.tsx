"use client";

import { FieldValues, useForm } from "react-hook-form";
import InputNode from "./inputNode";
import StandardButton from "../ui/button";
import { LoaderIcon, toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

interface Props {
  email: string | null | undefined;
}

export default function VerifyEmailForm({ email }: Props) {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const submitHandler = async (data: FieldValues) => {
    setIsLoading(true);

    let inputCode = "";
    for (const c in data) {
      inputCode += data[c];
    }

    try {
      await axios.post("/api/verify-email/finish", { email, inputCode });
      toast.success("Successfully verified email.");
      signOut();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-fit flex flex-col gap-16"
    >
      <section className="flex gap-8 justify-center mt-24">
        <InputNode {...register("number1")} />
        <InputNode {...register("number2")} />
        <InputNode {...register("number3")} />
        <InputNode {...register("number4")} />
        <InputNode {...register("number5")} />
        <InputNode {...register("number6")} />
      </section>
      <nav className="flex justify-evenly">
        <StandardButton
          className="w-56"
          type="button"
          disabled={isLoading}
        >
          Resend Email
        </StandardButton>
        <StandardButton
          disabled={isLoading}
          className="w-56"
        >
          {isLoading ? <LoaderIcon className="animate-spin" /> : "Verify Code"}
        </StandardButton>
      </nav>
    </form>
  );
}
