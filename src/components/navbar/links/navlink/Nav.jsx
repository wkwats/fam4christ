import Link from "next/link";
import styles from "./nav.module.css";

function navLink({ item }) {
  return (
    <div
      className={styles.container}
      // ${
      //   pathName === item.path && styles.active
      // }
    >
      <Link href={item.path} key={item.title}>
        {item.title}
      </Link>
    </div>
  );
}

export default navLink;
