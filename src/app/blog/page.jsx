import Image from "next/image";
import styles from "./blogView.module.css";
import BlogHeader from "@/components/blogHeader/BlogHeader";
import Menu from "@/components/menu/menu";
import { CardList } from "@/components/cardList/CardList";

import { getCategory } from "@/utils/data";
import MiniProfile from "@/components/blogHeader/miniProfile/MiniProfile";
const Blog = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  const { category, count } = await getCategory({ cat });

  const user = category.user;
  return (
    <div className={styles.container}>
      <div>
        <BlogHeader cat={category} />
      </div>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <div className={styles.leftDiv}>
          {user && <MiniProfile user={user} />}
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Blog;
