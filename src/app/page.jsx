import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import TopicLinks from "@/components/topics/TopicLinks";
import { CardList } from "@/components/cardList/CardList";

import Menu from "@/components/menu/menu";
import Notifications from "@/components/notifications/Notifications";

import Featured from "@/components/featured/Featured";

export const metadata = {
  title: "Families For Christ",
  description: "Home Page Families For Christ",
};

const Home = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const cat = "";
  return (
    <div className={styles.container}>
      <Featured />
      <TopicLinks />
      <div className={styles.content}>
        <Menu />
        <CardList page={page} cat={cat} />
      </div>
    </div>
  );
};

export default Home;
