import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Yandex from "next-auth/providers/yandex";

import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Yandex],
  pages: {
    signIn: "/login",
  },
});
