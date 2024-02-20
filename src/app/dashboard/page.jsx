import CategoryList from "@/components/categoryList/CategoryList";
import styles from "./dash.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <CategoryList />
    </div>
  );
}
