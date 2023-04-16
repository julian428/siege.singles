"use client";

import { useState } from "react";
import StandardInput from "../ui/input";
import StandardTextarea from "../ui/textarea";
import StandardButton from "../ui/button";
import axios, { AxiosError } from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LoadingIcon } from "@/lib/icons";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const signUpHandler = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      await axios.post("/api/signup", data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const e = error.response?.data as any;

        if (e[0]) {
          toast.error(e[0].message);
        }

        if (e.target) {
          if (e.target[0] === "name") {
            toast.error("Name is already taken.");
          } else if (e.target[0] === "email") {
            toast.error("Email already in use.");
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
        }
      }
    } finally {
      router.push("/auth");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(signUpHandler)}
      className="flex flex-col items-center gap-8 mt-16"
    >
      <StandardInput
        label="Visible name"
        autoComplete="off"
        required
        disabled={isLoading}
        min={3}
        max={21}
        {...register("name")}
      />
      <StandardInput
        label="Email"
        required
        disabled={isLoading}
        type="email"
        {...register("email")}
      />
      <StandardInput
        label="Password"
        disabled={isLoading}
        required
        type="password"
        minLength={8}
        maxLength={128}
        {...register("password")}
      />
      <StandardInput
        label="Link to profile image"
        disabled={isLoading}
        {...register("image")}
      />
      <StandardInput
        required
        disabled={isLoading}
        label="r6 username"
        maxLength={256}
        autoComplete="off"
        {...register("username")}
      />
      <StandardTextarea
        rows={3}
        required
        maxLength={256}
        disabled={isLoading}
        label="Profile description"
        {...register("description")}
      />
      <StandardButton disabled={isLoading}>
        {isLoading ? <LoadingIcon className="animate-spin" /> : "SignUp"}
      </StandardButton>
    </form>
  );
}
