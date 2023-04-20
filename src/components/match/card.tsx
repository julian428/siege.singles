import Image from "next/image";

interface Props {
  user: {
    name: string;
    username: string;
    image: string;
    description: string;
  };
}

export default function Card({ user }: Props) {
  return (
    <article className="w-[512px] h-[512px] relative">
      <Image
        src={user.image}
        alt={`${user.name} profile picture`}
        fill
      />
      <section className="absolute top-0 left-1/2 text-center text-3xl -translate-x-1/2 pt-2">
        {user.name}
      </section>
      <section className="absolute bottom-0 w-full bg-main bg-opacity-50 text-center">
        {user.description}
      </section>
    </article>
  );
}
