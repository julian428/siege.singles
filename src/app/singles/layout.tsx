import SinglesNav from "@/components/layouts/singles";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SinglesLayout({ children }: Props) {
  return (
    <main className="flex h-screen overflow-hidden">
      <SinglesNav />
      <article className="overflow-y-auto max-h-screen">{children}</article>
    </main>
  );
}
