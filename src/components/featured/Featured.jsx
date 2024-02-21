import Image from "next/image";
import styles from "./featured.module.css";
import Link from "next/link";
import { getFeaturedPost } from "@/utils/data";
import moment from "moment";
import parse from "html-react-parser";

async function Featured() {
  const { article } = await getFeaturedPost();
  const post = article[0];
  return (
    <div className={styles.featured}>
      <div className={styles.imgContainer}>
        <Image
          src={post?.img}
          fill
          alt="Main Photo"
          style={{
            objectFit: "fill",
            borderRadius: "4px 0 0 4px",
          }}
        />
      </div>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.user}>
            <div className={styles.userInfo}>
              <div className={styles.userImg}>
                <Image
                  src={post?.user?.image}
                  fill
                  alt="User Photo"
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className={styles.details}>
                <Link href={"/"}>
                  <span className={styles.authorName}>{post?.user?.name}</span>
                </Link>
                <span className={styles.userDate}>
                  {moment(post?.createdAt).fromNow()}
                </span>
              </div>
            </div>
            <div className={styles.userIcon}>
              <Image alt="three dots" fill src="/three-dots.png" />
            </div>
          </div>
          <span className={styles.userTitle}>{post?.title}</span>
          <div className={styles.desc}>
            {parse(`${post?.desc.substring(0, 80)}`)}
          </div>
          <div className={styles.buttons}>
            <Link href={`/blog/${post?.slug}`} className={styles.button}>
              Read more ...{" "}
            </Link>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerDiv}>
            <div className={styles.footerIcon}>
              <Image alt="heart" fill src="/heart.png" />
            </div>
            <span className={styles.footerVerticalLine}>|</span>
            <span className={styles.authorName}>1.5K</span>
          </div>
          <div className={styles.footerDiv}>
            <div className={styles.footerIcon}>
              <Image alt="message" fill src="/message.png" />
            </div>
            <span className={styles.footerVerticalLine}>|</span>
            <span className={styles.authorName}>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
