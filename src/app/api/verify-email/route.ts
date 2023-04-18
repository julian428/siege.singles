import prisma from "@/lib/db";
import mailer from "@/lib/send-mail";
import { codeGen } from "@/lib/utils";
import { ZodError, z } from "zod";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const isEmail = z.string().email("Invalid email").min(1);
    isEmail.parse(email);

    const verificationCode = codeGen(6);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        AuthCode: verificationCode,
      },
    });

    await mailer({
      auth: {
        pass: process.env.EMAIL_PASSWORD!,
        user: process.env.EMAIL_EMAIL!,
      },
      emailContent: {
        from: "Siege Singles",
        html: `<h1>Your verification code.</h1>\n<b>${verificationCode}</b>`,
        subject: "Verification code",
        text: `Your verification code is: ${verificationCode}`,
      },
      host: "smtp.gmail.com",
      receiver: email,
    });

    return new Response("Sucessfully sent verification code");
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Something went wrong. Try again later.", {
        status: 500,
      });
    }
    if (error instanceof ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Couldn't send verification email. Try again later.", {
      status: 500,
    });
  }
}
