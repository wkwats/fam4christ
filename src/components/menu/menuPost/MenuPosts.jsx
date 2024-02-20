import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css";
import { getFeaturedPost } from "@/utils/data";
import moment from "moment/moment";

const color_list = [
  // "#5e4fff31",
  // "#ffb04f45",
  // "#ff795736",
  // "#7fb88133",
  // "#da85c731",
  // "#57c4ff31",
  "#ff7857",
  "#ffb14f",
  "#7fb881",
  "#ff7887",
  "#775aec",
  "#789cff",
];

const MenuPosts = async ({ withImage }) => {
  const { article } = await getFeaturedPost();

  return (
    <div className={styles.items}>
      {article &&
        article.map((item) => {
          return (
            <Link href="/" className={styles.item}>
              {withImage && (
                <div className={styles.imageContainer}>
                  <Image
                    src={item?.img}
                    alt="post image"
                    fill
                    className={styles.image}
                  />
                </div>
              )}
              <div className={styles.textContainer}>
                <span
                  className={styles.category}
                  style={{
                    backgroundColor:
                      color_list[Math.floor(Math.random() * color_list.length)],
                  }}
                >
                  {item?.category?.title}
                </span>
                <h3 className={styles.postTitle}>{item?.title}</h3>
                <div className={styles.detail}>
                  <span className={styles.username}>{item?.user.name}</span>
                  <span className={styles.date}>
                    {" "}
                    - {moment(item?.createdAt).format("ll")}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default MenuPosts;
