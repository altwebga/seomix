import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import { prisma } from "@/prisma";
import type { Provider } from "next-auth/providers";
import Yandex from "next-auth/providers/yandex";
import GitHub from "next-auth/providers/github";
import NodeMailer from "next-auth/providers/nodemailer";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: string | null;
      image: string | null;
      role: Role;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }
}

const providers: Provider[] = [
  Yandex,
  GitHub,
  NodeMailer({
    from: process.env.EMAIL_FROM,
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
