import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    console.log(categories);
    return new NextResponse(JSON.stringify(categories, { status: 200 }));
    // return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const category = await prisma.category.create({
      data: { ...body, userEmail: session?.user?.email },
    });

    return new NextResponse(JSON.stringify(category, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
