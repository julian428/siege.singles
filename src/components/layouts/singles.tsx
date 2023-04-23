import { ChatsIcon, MatchIcon, ProfileIcon, SignoutIcon } from "@/lib/icons";
import Link from "next/link";
import SignOutButton from "../ui/signOut-button";

export default function SinglesNav() {
  return (
    <nav className="w-96 bg-secondary bg-opacity-10 flex flex-col justify-between px-8 py-4">
      <header>
        <Link
          href="/singles/match"
          className="flex items-center gap-4 text-2xl hover:text-action duration-500"
        >
          <MatchIcon className="text-4xl" />
          <h2>Match</h2>
        </Link>
      </header>
      <section className="flex flex-col gap-6 mb-4">
        <Link
          href="/singles/chats"
          className="flex items-center gap-4 text-2xl hover:text-action duration-500"
        >
          <ChatsIcon className="text-4xl" />
          Chats
        </Link>
        <Link
          href="/singles/profile"
          className="flex items-center gap-4 text-2xl hover:text-action duration-500"
        >
          <ProfileIcon className="text-4xl" />
          Profile
        </Link>
        <SignOutButton className="flex items-center gap-4 text-2xl hover:text-action duration-500">
          <SignoutIcon className="text-4xl" /> Sign out
        </SignOutButton>
      </section>
    </nav>
  );
}
