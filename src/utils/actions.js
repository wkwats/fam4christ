import { signIn, signOut } from "./auth";

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};
