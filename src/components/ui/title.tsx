"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  label: string;
  className?: string;
}

export default function PageTitle({ label, className, ...props }: Props) {
  const labelCharacters = label.split("");
  return (
    <h1
      {...props}
      className={cn("text-h1 font-black text tracking-widest", className)}
    >
      {labelCharacters.map((character, index) => {
        if (index === 0 || labelCharacters[index - 1] === " ") {
          return <span className="text-action italic">{character}</span>;
        }
        return <span>{character}</span>;
      })}
    </h1>
  );
}
