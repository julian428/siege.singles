import Image from "next/image";

interface Props {
  message: {
    message: string;
    User: {
      id: number;
      image: string;
      name: string;
    } | null;
  };
  uid: string;
}

export default function Message({ message, uid }: Props) {
  const sentByUser = uid === message.User?.id.toString();
  return (
    <section
      className={`w-full flex items-center gap-4 justify-end ${
        !sentByUser && "flex-row-reverse"
      }`}
    >
      <article
        className={`${
          sentByUser ? "bg-action" : "bg-secondary"
        } max-w-md rounded-lg md:px-4 px-2 text-main py-1 md:text-xl break-all`}
      >
        {message.message}
      </article>
      <Image
        src={message.User?.image || ""}
        alt={message.User?.name + " profile picture"}
        width={100}
        height={100}
        className="rounded-full md:w-16 md:h-16 h-8 w-8 self-end"
      />
    </section>
  );
}
