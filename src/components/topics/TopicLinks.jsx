import Image from "next/image";
import { TopicCard } from "./card/TopicCard";
import styles from "./topic.module.css";
import Link from "next/link";

import prisma from "@/utils/connect";
import { Skeleton } from "../ui/skeleton";

const color_list = [
  "#5e4fff31",
  "#ffb04f45",
  "#ff795736",
  "#7fb88133",
  "#da85c731",
  "#57c4ff31",
];

const TopicLinks = async () => {
  const categories = (await prisma.category.findMany()) || [];

  if (categories === undefined) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Blog Titles</h1>
        <div className={styles.categories}>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[50px] w-[250px] rounded-s" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[50px] w-[250px] rounded-s" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[50px] w-[250px] rounded-s" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[50px] w-[250px] rounded-s" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[50px] w-[250px] rounded-s" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[50px] w-[250px] rounded-s" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-[50px] w-[250px] rounded-s" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Blog Titles</h1>
      <div className={styles.categories}>
        {categories &&
          categories?.map((item) => {
            return (
              <Link
                href={`/blog?cat=${item.slug}`}
                className={styles.category}
                style={{
                  backgroundColor:
                    color_list[Math.floor(Math.random() * color_list.length)],
                }}
                key={item.id}
              >
                {item.img && (
                  <div className={styles.imgContainer}>
                    <Image
                      fill
                      src={item.img}
                      alt=""
                      style={{
                        objectFit: "cover",
                        borderRadius: "4px 0px 0px 4px",
                      }}
                    />
                  </div>
                )}
                {item.title}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default TopicLinks;
