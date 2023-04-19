import LoginForm from "@/components/auth/loginForm";
import PageTitle from "@/components/ui/title";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Siege Singles | login",
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);

  return (
    <>
      <PageTitle
        className="text-center mt-8"
        label="Login"
      />
      <main className="flex flex-col items-center mt-16">
        <LoginForm />
      </main>
    </>
  );
}
