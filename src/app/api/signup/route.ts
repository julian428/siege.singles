import prisma from "@/lib/db";
import { signupSchema } from "@/validators/valid-signup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hash } from "bcrypt";
import { ZodError } from "zod";

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
      data.image = "";
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
