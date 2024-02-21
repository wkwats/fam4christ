import styles from "./singleBlog.module.css";
import Image from "next/image";
import Menu from "@/components/menu/menu";
import { getPost } from "@/utils/data";
import kFormatter from "@/utils/logic";
import moment from "moment";
import Comments from "@/components/comments/Comments";
import parse from "html-react-parser";
import { auth } from "@/utils/auth";

const Article = async ({ params }) => {
  const { slug } = params;
  const { article, count } = await getPost(slug);

  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{article?.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              {article?.user?.image && (
                <Image
                  src={article?.user?.image}
                  alt="User Image"
                  fill
                  className={styles.avatar}
                />
              )}
            </div>

            <div className={styles.userTextContainer}>
              <span className={styles.username}>{article?.user?.name}</span>
              <span className={styles.date}>
                {moment(article?.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          {article?.img && (
            <Image
              src={article.img}
              alt="Article Image"
              fill
              style={{
                objectFit: "cover",
                borderRadius: "4px",
              }}
              className={styles.image}
            />
          )}
        </div>
      </div>
      <div className={styles.likesTags}>
        <div className={styles.likes}>
          <div className={styles.iconDiv}>
            <span className={styles.authorName}>views</span>
            <span className={styles.verticalLine}>|</span>
            <span className={styles.authorName}>
              {" "}
              {kFormatter(article?.views)}
            </span>
          </div>
          <div className={styles.iconDiv}>
            <div className={styles.icons}>
              <Image alt="heart" fill src="/heart.png" />
            </div>
            <span className={styles.verticalLine}>|</span>
            <span className={styles.authorName}>
              {kFormatter(article?.likes)}
            </span>
          </div>
          <div className={styles.iconDiv}>
            <div className={styles.icons}>
              <Image alt="message" fill src="/message.png" />
            </div>
            <span className={styles.verticalLine}>|</span>
            <span className={styles.authorName}>
              {" "}
              {/* {count ?? kFormatter(count)}100 */}
              100
            </span>
          </div>
        </div>
        <div className={styles.tags}>
          <span className={styles.authorName}>Tags:</span>

          {article?.tags?.map((tag) => {
            return (
              <div className={styles.tagDiv} key={tag}>
                <span className={styles.tagName}>{tag}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>{parse(`${article?.desc}`)}</div>
          <div className={styles.comment}>
            <Comments articleSlug={slug} session={session} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Article;
