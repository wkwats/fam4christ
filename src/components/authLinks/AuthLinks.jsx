"use client";
import Link from "next/link";
import NavLink from "../navbar/links/navlink/navLink";
import styles from "./authLinks.module.css";
import { useState } from "react";

const AuthLinks = (session) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {session?.user ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <NavLink item={{ title: "Dashboard", path: "/dashboard" }} />
          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {session?.user ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <NavLink item={{ title: "Dashboard", path: "/dashboard" }} />
              <button className={styles.link}>Logout</button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
