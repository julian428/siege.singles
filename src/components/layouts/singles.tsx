import { ChatsIcon, MatchIcon, ProfileIcon, SignoutIcon } from "@/lib/icons";
import Link from "next/link";
import SignOutButton from "../ui/signOut-button";
import Image from "next/image";

interface Props {
  userChats: {
    id: string;
    image: string;
    name: string;
  }[];
}

export default function SinglesNav({ userChats }: Props) {
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
        <section>
          <Link
            href="/singles/chats"
            className="flex items-center gap-4 text-2xl hover:text-action duration-500"
          >
            <ChatsIcon className="text-4xl" />
            Chats
          </Link>
          <section className="max-h-96 overflow-y-auto flex flex-col gap-2 items-start my-4 ml-2">
            {userChats.map((chat) => (
              <Link
                key={chat.id}
                href={`/singles/chats/${chat.id}`}
                className="flex gap-2 hover:bg-action transition-colors duration-500 items-center px-2 py-1 rounded-lg"
              >
                <Image
                  src={chat.image}
                  alt={chat.name + " profile picture"}
                  width={30}
                  height={30}
                  className="rounded-full w-8 h-8"
                />
                <p>{chat.name}</p>
              </Link>
            ))}
          </section>
        </section>
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
