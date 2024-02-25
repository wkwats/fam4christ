import kFormatter from "@/utils/logic";
import styles from "./topcard.module.css";

const TopCard = ({ item }) => {
  return (
    <div className={`${styles.container} ${styles[item.color]}`}>
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>{kFormatter(item.number)}</span>
        <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than previous week
        </span>
      </div>
    </div>
  );
};

export default TopCard;
