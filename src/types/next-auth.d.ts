import type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      description: string;
      username: string;
      name: string;
      image: string;
      active: boolean;
    };
  }
}
