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
        console.log("authorizing...");
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

        console.log("authorized with: ", {
          id: user.id.toString(),
          email: user.email,
          description: user.description,
          username: user.username,
          name: user.name,
          friendIds: user.friendIds,
          image: user.image,
          active: user.active,
        });

        return {
          id: user.id.toString(),
          email: user.email,
          description: user.description,
          username: user.username,
          name: user.name,
          friendIds: user.friendIds,
          image: user.image,
          active: user.active,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("cb-session-token", token);
      console.log("cb-session", session);
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          description: token.description,
          username: token.username,
          name: token.name,
          friendIds: token.friendIds,
          image: token.image as string,
          active: token.active,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("cb-token", token);
      console.log("cb-user", user);
      if (!user) return token;

      const u = user as unknown as User;
      return {
        id: u.id,
        email: u.email,
        description: u.description,
        name: u.name,
        username: u.username,
        friendIds: u.friendIds,
        image: u.image,
        active: u.active,
      };
    },
  },
  pages: {
    signIn: "/auth",
  },
};
