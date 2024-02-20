import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";

const Admin = async () => {
  const session = await auth();

  return (
    <div>
      <h1>Admin page</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Role: {session?.user?.role}</p>
      <p>Name: {session?.user?.name}</p>
    </div>
  );
};

export default Admin;
