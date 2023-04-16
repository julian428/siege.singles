import SignUpForm from "@/components/auth/signupForm";
import PageTitle from "@/components/ui/title";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Siege Singles | SignUp",
};

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/singles/match");

  return (
    <>
      <header>
        <PageTitle
          className="text-center mt-8"
          label="SingUp"
        />
      </header>
      <main>
        <SignUpForm />
      </main>
    </>
  );
}
