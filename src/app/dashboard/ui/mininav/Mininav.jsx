"use client";
import Image from "next/image";
import styles from "./mininav.module.css";
import { usePathname, useSearchParams } from "next/navigation";

const Mininav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("category");

  return (
    <div className={styles.container}>
      <div className={styles.title}>{`${pathname.split("/").pop()} ${
        search ? `- ${search?.split("-").join(" ")}` : ""
      }`}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <div className={styles.footerIcon}>
            <Image alt="search icon" fill src="/searchicon.png" />
          </div>
          <input
            type="text"
            placeholder="Search ...."
            className={styles.input}
          />
        </div>
        <div className={styles.icons}>
          <div className={styles.footerIcon}>
            <Image alt="notifications" fill src="/bell.png" />
          </div>
          <div className={styles.footerIcon}>
            <Image alt="heart" fill src="/heart.png" />
          </div>
          <div className={styles.footerIcon}>
            <Image alt="message" fill src="/message.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mininav;
