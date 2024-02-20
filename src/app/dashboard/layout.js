import DashNav from "@/components/dashnav/DashNav";
import styles from "./main.module.css";

export default function DashLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <DashNav />
        {children}
      </div>
    </div>
  );
}
