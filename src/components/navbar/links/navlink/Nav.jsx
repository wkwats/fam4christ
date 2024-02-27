"use client";

import Link from "next/link";
import styles from "./nav.module.css";
import { usePathname } from "next/navigation";

const Nav = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path && styles.active
      }`}
    >
      {item.title}
    </Link>
  );
};

export default Nav;
