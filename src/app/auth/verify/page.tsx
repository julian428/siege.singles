import VerifyEmailForm from "@/components/auth/verifyEmailForm";
import PageTitle from "@/components/ui/title";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Siege Singles | Verify",
};

export default async function VerifyPage() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <header className="text-center pt-8">
        <PageTitle label="Verify Email" />
      </header>
      <main className="flex justify-center md:mt-24 mt-12">
        <VerifyEmailForm email={session!.user?.email} />
      </main>
    </>
  );
}
