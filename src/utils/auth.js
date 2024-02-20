import NextAuth from "next-auth";
import { authConfig } from "./authconfig";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/connect";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
