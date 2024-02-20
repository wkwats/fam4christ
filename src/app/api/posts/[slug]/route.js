import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  const query = {
    where: {
      ...(slug && { slug }),
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  };

  try {
    const [article, count] = await prisma.$transaction([
      prisma.article.update({ ...query, data: { views: { increment: 1 } } }),
      prisma.comment.count({ where: { articleSlug: slug } }),
    ]);

    // const article = await prisma.article.update({
    //   where: { slug },
    //   data: { views: { increment: 1 } },
    //   include: { user: true },
    // });

    return new NextResponse(
      JSON.stringify({ article, count }, { status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
