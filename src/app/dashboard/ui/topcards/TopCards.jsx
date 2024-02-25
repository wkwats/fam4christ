import TopCard from "../topcard/TopCard";
import styles from "./topcards.module.css";

const cardinfo = [
  {
    title: "Articles",
    number: 500,
    change: 3,
    color: "articles",
  },
  {
    title: "Likes",
    number: 25000,
    change: -1,
    color: "likes",
  },
  {
    title: "Comments",
    number: 5000,
    change: 14,
    color: "comments",
  },
];

export const TopCards = () => {
  return (
    <div className={styles.container}>
      {cardinfo &&
        cardinfo.map((item) => {
          return <TopCard item={item} />;
        })}
    </div>
  );
};
