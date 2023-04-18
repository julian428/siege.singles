import prisma from "@/lib/db";
import mailer from "@/lib/send-mail";
import { codeGen } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const verificationCode = codeGen(6);

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

    return new Response(JSON.stringify(verificationCode));
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Something went wrong. Try again later.");
    }
    return new Response("Couldn't send verification email. Try again later.");
  }
}
