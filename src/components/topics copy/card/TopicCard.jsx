import Image from "next/image";
import styles from "./card.module.css";

export const TopicCard = ({ item }) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: `${item.bgColor}` }}
    >
      <div className={styles.imgContainer}>
        <Image
          fill
          src={item.bgPhoto}
          alt=""
          style={{
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </div>
      <span className={styles.topicName}>{item.name}</span>
    </div>
  );
};
