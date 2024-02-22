import Image from "next/image";
import styles from "./home.module.css";
import Link from "next/link";
import TopicLinks from "@/components/topics/TopicLinks";
import { CardList } from "@/components/cardList/CardList";
import Featured from "@/components/featured/Featured";
import Menu from "@/components/menu/menu";
import Notifications from "@/components/notifications/notifications";

const Home = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const cat = "";
  return (
    <div className={styles.container}>
      <section className={styles.topSec}>
        <Featured />
        <Notifications />
      </section>
      <TopicLinks />
      <section className={styles.bottomSec}>
        <Menu />
        <CardList page={page} cat={cat} />
      </section>
    </div>
  );
};

export default Home;
