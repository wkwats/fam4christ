import TopCard from "../topcard/TopCard";
import styles from "./topcards.module.css";

export const TopCards = ({ cardinfo }) => {
  return (
    <div className={styles.container}>
      {cardinfo &&
        cardinfo.map((item) => {
          return <TopCard key={item.title} item={item} />;
        })}
    </div>
  );
};
