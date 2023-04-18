import prisma from "@/lib/db";
import { codeGen } from "@/lib/utils";
import { signupSchema } from "@/validators/valid-signup";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    signupSchema.parse(data);

    const usernameTaken = await prisma.user.findFirst({
      where: {
        name: data.name,
      },
    });

    const emailTaken = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (usernameTaken)
      return new Response("Username already taken.", { status: 400 });

    if (emailTaken)
      return new Response("Email already taken.", { status: 400 });

    const verificationCode = codeGen(6);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "Siege singles",
      to: data.email,
      subject: "Siege Singless - Verification Code",
      text: `Your verification code is: ${verificationCode}`,
      html: `<h1>Verification Code</h1>\nYour verification code is: <b>${verificationCode}</b>`,
    });

    return new Response(JSON.stringify(verificationCode));
  } catch (error) {
    if (error instanceof Error) {
      return new Response("Something went wrong. Try again later.");
    }
    return new Response("Couldn't send verification email. Try again later.");
  }
}
