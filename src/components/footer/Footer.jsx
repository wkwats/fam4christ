import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <Image
              src="/logoffc2.png"
              alt="lama blog"
              width={150}
              height={150}
            />
            <p className={styles.desc}>
              We believe that by building strong family foundations on the
              teachings of Christ, we can create lasting bonds, instill values
              that endure, and navigate life&apos;s challenges with faith and
              resilience.
            </p>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.list}>
            <span className={styles.listTitle}>Links</span>
            <Link href="/">Homepage</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>

          <div className={styles.list}>
            <span className={styles.listTitle}>Tags</span>
            <Link href="/">Marriage</Link>
            <Link href="/">Youth</Link>
            <Link href="/">Bible</Link>
            <Link href="/">Travel</Link>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.fineprint}>
        <div className={styles.copyright}>WKWATS INC &copy; 2024</div>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/twitter.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
