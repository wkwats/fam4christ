import { auth, getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 8;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat || "" }),
    },
  };

  try {
    const articles = await prisma.article.findMany({
      ...query,
      orderBy: {
        createdAt: "desc",
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
    });
    const count = await prisma.article.count({ where: query.where });
    const views = await prisma.article.aggregate({
      _sum: {
        views: true,
      },
    });

    return new NextResponse(
      JSON.stringify({ articles, count, views }, { status: 200 })
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
