"use client";

import { FieldValues, useForm } from "react-hook-form";
import InputNode from "./inputNode";
import StandardButton from "../ui/button";
import { LoaderIcon, toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import ResendEmailButton from "./ResendEmailButton";

interface Props {
  email: string | null | undefined;
}

export default function VerifyEmailForm({ email }: Props) {
  const { register, handleSubmit, watch, setFocus } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data: FieldValues) => {
    setIsLoading(true);

    let inputCode = "";
    for (const c in data) {
      inputCode += data[c];
    }

    inputCode = inputCode.toLowerCase();

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

  const resendEmail = async () => {
    await axios.post("/api/verify-email", { email });
    toast.success("Email resent.");
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const index = parseInt(name!.charAt(name!.length - 1)!);
      if (!value[name!]) {
        if (index === 1) return;
        const focusto = `number${(index - 1).toString()}`;
        setFocus(focusto);
      } else {
        if (index === 6) return;
        const focusto = `number${(index + 1).toString()}`;
        setFocus(focusto);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-fit flex flex-col gap-32"
    >
      <section className="flex  gap-2 md:gap-8 justify-center mt-24">
        <InputNode {...register("number1")} />
        <InputNode {...register("number2")} />
        <InputNode {...register("number3")} />
        <InputNode {...register("number4")} />
        <InputNode {...register("number5")} />
        <InputNode {...register("number6")} />
      </section>
      <nav className="flex flex-col-reverse md:flex-row items-center gap-8 justify-evenly">
        <ResendEmailButton afterTimer={resendEmail} />
        <StandardButton
          disabled={isLoading}
          className="w-56 h-14"
        >
          {isLoading ? <LoaderIcon className="animate-spin" /> : "Verify Code"}
        </StandardButton>
      </nav>
    </form>
  );
}
