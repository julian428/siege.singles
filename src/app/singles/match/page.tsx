import Card from "@/components/match/card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Sige Singles | match",
};

export default async function MatchPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card session={session!} />
    </div>
  );
}
