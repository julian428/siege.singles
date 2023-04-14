import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@email.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          description: user.description,
          username: user.username,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          description: token.description,
          username: token.username,
          name: token.name,
          image: token.image as string,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (!user) return token;

      const u = user as unknown as User;
      return {
        id: u.id,
        email: u.email,
        description: u.description,
        name: u.name,
        username: u.username,
        image: u.image,
      };
    },
  },
  pages: {
    signIn: "/auth",
  },
};
