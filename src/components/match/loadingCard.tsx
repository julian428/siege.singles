import { HateIcon, LikeIcon } from "@/lib/icons";
import type { ReactNode } from "react";

export default function LoadingCard({ children }: { children?: ReactNode }) {
  return (
    <div>
      <article
        className={`md:w-[512px] md:h-[512px] w-[90vw] h-[90vw] transition-all flex flex-col justify-center items-center ${
          !children ? "animate-pulse" : "bg-opacity-50"
        } bg-secondary`}
      >
        {children}
      </article>
      <nav className="flex text-7xl justify-between p-8 items-center opacity-50">
        <HateIcon />
        <LikeIcon />
      </nav>
    </div>
  );
}
