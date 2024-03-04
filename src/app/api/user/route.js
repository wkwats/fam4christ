import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.user.findMany();

    return new NextResponse(JSON.stringify(categories, { status: 200 }));
    // return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// UPDATE USER
export const POST = async (req) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  const query = {
    where: {
      email: session?.user?.email,
    },
  };

  try {
    const body = await req.json();
    console.log(body);
    const user = await prisma.user.update({
      ...query,
      data: { image: body.image || undefined, bio: body.bio || undefined },
    });

    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
