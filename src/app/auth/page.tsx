import LoginForm from "@/components/auth/loginForm";
import PageTitle from "@/components/ui/title";

export const metadata = {
  title: "Siege Singles | login",
};

export default async function SignInPage() {
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
