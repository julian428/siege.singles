import LoginButtonApple from "@/components/auth/login-apple";
import LoginButtonGoogle from "@/components/auth/login-google";
import Image from "next/image";

export const metadata = {
  title: "Siege Singles | login",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-h1 text-center">Login</h1>
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
