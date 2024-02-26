import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import TopicLinks from "@/components/topics/TopicLinks";
import { CardList } from "@/components/cardList/CardList";

import Menu from "@/components/menu/menu";
import Notifications from "@/components/notifications/Notifications";
import { Suspense } from "react";
import Featured from "@/components/featured/Featured";

const Home = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const cat = "";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.container}>
        <Featured />
        <TopicLinks />
        <div className={styles.content}>
          <Menu />
          <CardList page={page} cat={cat} />
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
