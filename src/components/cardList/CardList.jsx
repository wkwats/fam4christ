import { getPosts } from "@/utils/data";
import Card from "../card/Card";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";

export const CardList = async ({ page, cat }) => {
  const POST_PER_PAGE = 2;

  const { articles, count } = await getPosts(page, cat);
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {articles?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};
