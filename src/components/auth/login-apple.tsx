"use client";

import { AppleIcon, LoadingIcon } from "@/lib/icons";
import StandardButton from "../ui/button";
import { useState } from "react";
import { sleep } from "@/lib/utils";

export default function LoginButtonApple() {
  const [isLoading, setIsLoading] = useState(false);
  const googleLoginHanlder = async () => {
    setIsLoading(true);
    try {
      //! (finish) try to log in with google
      await sleep(2000); //? placeholder
    } catch (error) {
      //! (finish)  handle error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <StandardButton
      disabled={isLoading}
      onClick={googleLoginHanlder}
    >
      {isLoading ? <LoadingIcon className="animate-spin" /> : <AppleIcon />}{" "}
      Apple
    </StandardButton>
  );
}
