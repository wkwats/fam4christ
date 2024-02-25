import styles from "./dash.module.css";
import { TopCards } from "./ui/topcards/TopCards";
import ArticleList from "./ui/articlelist/ArticleList";
import Chart from "./ui/chart/chart";
import Notifications from "@/components/notifications/Notifications";

export default function Dashboard() {
  return (
    <div className={styles.content}>
      <div className={styles.leftdiv}>
        <TopCards />
        <ArticleList />
        <Chart />
      </div>
      <div className={styles.rightdiv}>
        <Notifications />
      </div>
    </div>
  );
}
