import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const articleSlug = searchParams.get("articleSlug");

  const query = {
    where: {
      ...(articleSlug && { articleSlug }),
    },
  };

  try {
    const [comments, count] = await prisma.$transaction([
      prisma.comment.findMany({
        where: {
          ...(articleSlug && { articleSlug: articleSlug }),
        },
        include: { user: true },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.comment.count(query),
    ]);

    return new NextResponse(
      JSON.stringify({ comments, count }, { status: 200 })
    );
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
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
