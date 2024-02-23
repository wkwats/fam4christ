"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "./connect";

export const getCategory = async ({ cat: slug }) => {
  const res = await fetch(`http://localhost:3000/api/categories/${slug}`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category!");
  }

  return res.json();
};

export const getCategories = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getPostsData = async (req) => {
  const POST_PER_PAGE = 4;
  const { page } = req;
  const { cat } = req || "";
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [articles, count] = await prisma.$transaction([
      prisma.article.findMany({
        ...query,
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          cat: {
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

    return { articles, count, POST_PER_PAGE };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPosts = async (page, cat) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getFeaturedPost = async () => {
  const page = 1;
  const cat = "";
  const res = await fetch(
    `http://localhost:3000/api/posts?page=${page}&cat=${cat}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const getPost = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
