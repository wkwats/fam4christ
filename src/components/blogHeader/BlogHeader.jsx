import Image from "next/image";
import styles from "./blogHeader.module.css";

export default function BlogHeader({ cat }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitles}>
        <span className={styles.headerTitleSm}>{cat.title}</span>
        <span className={styles.headerTitleLg}>BLOG</span>
      </div>
      <div className={styles.headerImg}>
        <Image
          src={cat.img}
          alt="cat image"
          fill
          className={styles.image}
          style={{
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}
