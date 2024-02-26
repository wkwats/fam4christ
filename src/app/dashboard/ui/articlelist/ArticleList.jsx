import Image from "next/image";
import styles from "./dasharticles.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameInitials } from "@/utils/logic";
import moment from "moment/moment";

const ArticleList = ({ articles }) => {
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
          {articles?.map((item) => (
            <tr key={item.id}>
              <td>
                <div className={styles.user}>
                  <div>
                    <Avatar>
                      <AvatarImage src={item.user.image} />

                      <AvatarFallback>
                        {nameInitials(item.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  {item.user.name}
                </div>
              </td>
              <td>{item.title}</td>
              <td>{moment().format("DD/MM/YY")}</td>
              <td>
                <span className={`${styles.status} ${styles.pending}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
