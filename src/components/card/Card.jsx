import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import moment from "moment";
import kFormatter from "@/utils/logic";
import parse from "html-react-parser";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image
            src={item.img}
            alt="main photo"
            fill
            className={styles.image}
            style={{
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            <div className={styles.userImg}>
              {item.user.image && (
                <Image
                  src={item.user.image}
                  fill
                  alt="user image"
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <div className={styles.details}>
              {/* <Link href={`/authors/${item.user.name}`}>
                <span className={styles.authorName}>{item.user.name}</span>
              </Link> */}
              <span className={styles.authorName}>{item.user.name}</span>
            </div>
          </div>
        </div>
        <div className={styles.detail}>
          <span className={styles.date}>
            {moment(item.createdAt).fromNow()} -{" "}
          </span>
          <Link href={`/blog?cat=${item.catSlug}`}>
            <span className={styles.category}>{item.category.title}</span>
          </Link>
        </div>

        <Link href={`/blog/${item.slug}`}>
          <span className={styles.userTitle}>{item.title}</span>
        </Link>

        <div className={styles.desc}>{parse(`${item?.desc}`)}</div>

        <Link href={`/blog/${item.slug}`} className={styles.link}>
          Read More
        </Link>
        <div className={styles.footer}>
          <div className={styles.footerDiv}>
            <div className={styles.footerIcon}>
              <Image alt="heart" fill src="/heart.png" />
            </div>
            <span className={styles.footerVerticalLine}>|</span>
            <span className={styles.authorName}>{kFormatter(item?.likes)}</span>
          </div>
          <div className={styles.footerDiv}>
            <div className={styles.footerIcon}>
              <Image alt="message" fill src="/message.png" />
            </div>
            <span className={styles.footerVerticalLine}>|</span>
            <span className={styles.authorName}>
              {kFormatter(item?.comments.length)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
