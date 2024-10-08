import type { NextAuthConfig } from "next-auth";
import Yandex from "next-auth/providers/yandex";

export default {
  providers: [Yandex],
} satisfies NextAuthConfig;
