import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, inputCode } = await request.json();
    if (!inputCode) {
      return new Response("Invalid verification code.", { status: 400 });
    }
    if (!email) {
      return new Response("Something went wrong. Please try again later.", {
        status: 500,
      });
    }

    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (data?.AuthCode !== inputCode) {
      return new Response("The verification code doesn't match.", {
        status: 400,
      });
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        AuthCode: null,
        active: true,
      },
    });

    return new Response("Successfully verified email");
  } catch (error) {
    return new Response("Something went wrong. Log in again or try later.");
  }
}
