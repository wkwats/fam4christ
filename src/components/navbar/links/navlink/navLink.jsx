"use client";

import Link from "next/link";
import styles from "./navlink.module.css";
import { usePathname } from "next/navigation";

function navLink({ item }) {
  const pathName = usePathname();

  return (
    <div
      className={`${styles.container} ${
        pathName === item.path && styles.active
      }`}
    >
      <Link href={item.path} key={item.title}>
        {item.title}
      </Link>
    </div>
  );
}

export default navLink;
