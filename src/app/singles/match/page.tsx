import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sige Singles | match",
};

export default async function MatchPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  return <div>{session.user?.email}</div>;
}
