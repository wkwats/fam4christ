import prisma from "@/utils/connect";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  page: {
    signIn: "/login",
  },
  providers: [
    GithubProvider({
      profile(profile) {
        let userRole = "Github User";
        if (profile?.email == "wkwats@gmail.com") {
          userRole = "admin";
        }
        return {
          //...profile,
          id: profile.id,
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log(profile);
        let userRole = "Google User";
        if (profile?.email == "wkwats@gmail.com") {
          userRole = "admin";
        }

        return {
          //...profile,
          id: profile.sub,
          role: userRole,
          image: profile.picture,
          email: profile.email,
          name: `${profile.given_name} ${profile.family_name}`,
        };
      },

      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user?.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
};
