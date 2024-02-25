import styles from "./dash.module.css";
import { TopCards } from "./ui/topcards/TopCards";
import ArticleList from "./ui/articlelist/ArticleList";

export default function Dashboard() {
  return (
    <div className={styles.content}>
      <div className={styles.leftdiv}>
        <TopCards />
        <ArticleList />
      </div>
      <div className={styles.rightdiv}>Right</div>
    </div>
  );
}
