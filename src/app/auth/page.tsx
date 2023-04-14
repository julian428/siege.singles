import LoginButtonApple from "@/components/auth/login-apple";
import LoginButtonGoogle from "@/components/auth/login-google";
import PageTitle from "@/components/ui/title";
import Image from "next/image";

export const metadata = {
  title: "Siege Singles | login",
};

export default function LoginPage() {
  return (
    <>
      <PageTitle
        className="text-center mt-8"
        label="Login"
      />
      <main className="flex flex-col items-center mt-24">
        <Image
          src={process.env.NEXT_PUBLIC_LOGO || ""}
          alt="Siege Singles Logo"
          className="pb-2 mb-8 border-b-2"
          width={200}
          height={100}
        />
        <nav className="flex flex-col gap-4">
          <LoginButtonGoogle />
          <LoginButtonApple />
        </nav>
      </main>
    </>
  );
}
