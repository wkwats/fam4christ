import { auth, getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 2;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat || "" }),
    },
  };

  try {
    const [articles, count] = await prisma.$transaction([
      prisma.article.findMany({
        ...query,
        orderBy: {
          views: "asc",
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          category: {
            select: {
              title: true,
            },
          },
          comments: {
            select: {
              desc: true,
            },
          },
        },
      }),
      prisma.article.count({ where: query.where }),
    ]);

    return new NextResponse(
      JSON.stringify({ articles, count }, { status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  const session = await auth();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const article = await prisma.article.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(article, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
