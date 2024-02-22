import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Github({
      profile(profile) {
        let userRole = "Github User";
        if (profile?.email == "wkwats@gmail.com") {
          userRole = "admin";
        }
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          role: userRole,
        };
      },
    }),
    Google({
      profile(profile) {
        let userRole = "Google User";
        if (profile?.email == "wkwats@gmail.com") {
          userRole = "admin";
        }
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;

      const isDashAdmin = auth?.user.role == "admin";
      const isOnAdminPanel = nextUrl?.pathname.startsWith("/dashboard");
      //const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
      const isOnLoginPage = nextUrl?.pathname.startsWith("/login");

      // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

      if (isOnAdminPanel && !isDashAdmin) {
        return false;
      }

      // // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

      // if (isOnBlogPage && !user) {
      //   return false;
      // }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
};
