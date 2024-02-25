import styles from "./main.module.css";
import CategoryList from "./ui/categoryList/CategoryList";
import Mininav from "./ui/mininav/Mininav";

export default function DashLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidemenu}>
        <CategoryList />
      </div>

      <div className={styles.wrapper}>
        <Mininav />
        {children}
      </div>
    </div>
  );
}
