import prisma from "@/lib/db";
import { signupSchema } from "@/validators/valid-signup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcrypt";
import { ZodError } from "zod";
import stats from "r6s-stats-api";

interface signupData {
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  description?: string;
  image?: string;
}

export async function POST(req: Request) {
  try {
    let data = (await req.json()) as signupData;

    const { name, email, password, username, description } =
      signupSchema.parse(data);
    if (!data.image) {
      const playerStats = await stats.rank("pc", username);
      if (typeof playerStats === "string") {
        data.image =
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.-GQtCHQqasmFzY3vAcYUDAAAAA%26pid%3DApi&f=1&ipt=0097032b650912b818b702ea3234271ff4ba04747329bd6f098aaccc5415af5d&ipo=images";
      } else {
        data.image = playerStats.header;
      }
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 12),
        username,
        description,
        image: data.image,
      },
    });

    await prisma.$disconnect();

    return new Response("Created user", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 400 });
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return new Response(JSON.stringify(error.meta), { status: 400 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
}
