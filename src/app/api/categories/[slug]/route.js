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
      user: true,
    },
  };

  try {
    const [category, count] = await prisma.$transaction([
      prisma.category.findUnique({
        ...query,
      }),
      prisma.article.count({ where: { catSlug: slug } }),
    ]);

    return new NextResponse(
      JSON.stringify({ category, count }, { status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
