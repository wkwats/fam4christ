import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import moment from "moment";
import kFormatter, { nameInitials } from "@/utils/logic";
import parse from "html-react-parser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      {item.img && (
        <div className={styles.imagecontainer}>
          <Image
            src={item.img}
            alt="main photo"
            fill
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.textcontainer}>
        <div className={styles.topsec}>
          <div className={styles.topsecleft}>
            <Avatar>
              <AvatarImage src={item.user.image} />
              <AvatarFallback>{nameInitials(item.user.name)}</AvatarFallback>
            </Avatar>
            <span className={styles.authorName}>{item.user.name}</span>
          </div>
          <div className={styles.topsecright}>
            <div className={styles.footerDiv}>
              <div className={styles.footerIcon}>
                <Image alt="heart" fill src="/heart.png" />
              </div>
              <span className={styles.footerVerticalLine}>|</span>
              <span className={styles.authorName}>
                {kFormatter(item?.likes)}
              </span>
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
        <div className={styles.content}>
          <div className={styles.detail}>
            <span className={styles.date}>
              {moment(item.createdAt).fromNow()} -{" "}
            </span>
            <Link href={`/blog?cat=${item.catSlug}`}>
              <span className={styles.category}>{item.category.title}</span>
            </Link>
          </div>
          <Link href={`/blog/${item.slug}`}>
            <h1 className={styles.posttitle}>{item.title}</h1>
          </Link>

          <div className={styles.desc}>{parse(`${item?.desc}`)}</div>

          <Link href={`/blog/${item.slug}`} className={styles.link}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
