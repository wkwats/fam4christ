import Image from "next/image";
import styles from "./featured.module.css";
import Link from "next/link";
import { getFeaturedPost } from "@/utils/data";
import moment from "moment";
import parse from "html-react-parser";
import { Skeleton } from "@/components/ui/skeleton";

async function Featured() {
  const article = await getFeaturedPost();
  const post = article[0];
  if (post === undefined) {
    return (
      <div className={styles.featured}>
        <Skeleton className="h-[50%] w-[100%] rounded-xl" />
        <div className="h-[50%] w-[100%] space-y-2 m-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[50%]" />
        </div>
      </div>
    );
  }

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
