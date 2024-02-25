import Image from "next/image";
import styles from "./dasharticles.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameInitials } from "@/utils/logic";
const ArticleList = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Articles</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Arthor</td>
            <td>Title</td>
            <td>Date</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                {/* <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                /> */}
                <div>
                  <Avatar>
                    {/* <AvatarImage src={user.image} /> */}
                    <AvatarImage src="" />
                    {/* <AvatarFallback>{nameInitials(user?.name)}</AvatarFallback> */}
                    <AvatarFallback>WK</AvatarFallback>
                  </Avatar>
                </div>
                Watson Kambo
              </div>
            </td>
            <td>Navigating the Christian Marriage Landscape</td>
            <td>10.12.2023</td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pending
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
