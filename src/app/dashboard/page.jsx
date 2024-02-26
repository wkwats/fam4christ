import styles from "./dash.module.css";
import { TopCards } from "./ui/topcards/TopCards";
import ArticleList from "./ui/articlelist/ArticleList";
import Chart from "./ui/chart/chart";
import Notifications from "@/components/notifications/Notifications";
import { getPosts, getPostsDash } from "@/utils/data";

export const metadata = {
  title: "Dashboard | Families For Christ",
  description: "Dashboard Families For Christ",
};

export default async function Dashboard() {
  let page = 1;
  let cat = "";
  // const { articles, count, views } = await getPostsDash();
  const { articles, count, views } = await getPosts(page, cat);

  const cardinfo = [
    {
      title: "Articles",
      number: count,
      change: 3,
      color: "articles",
    },
    {
      title: "Likes",
      number: views._sum.views,
      change: -1,
      color: "likes",
    },
    {
      title: "Comments",
      number: 2,
      change: 14,
      color: "comments",
    },
  ];

  return (
    <div className={styles.content}>
      <div className={styles.leftdiv}>
        <TopCards cardinfo={cardinfo} />
        <ArticleList articles={articles} />
        <Chart />
      </div>
      <div className={styles.rightdiv}>
        <Notifications />
      </div>
    </div>
  );
}
