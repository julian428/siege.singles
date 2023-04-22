import SignUpForm from "@/components/auth/signupForm";
import PageTitle from "@/components/ui/title";

export const metadata = {
  title: "Siege Singles | SignUp",
};

export default async function SignUpPage() {
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
