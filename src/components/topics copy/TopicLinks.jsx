import Image from "next/image";
import { TopicCard } from "./card/TopicCard";
import styles from "./topic.module.css";
import Link from "next/link";

const color_list = [
  "#5e4fff31",
  "#ffb04f45",
  "#ff795736",
  "#7fb88133",
  "#da85c731",
  "#57c4ff31",
];

const topics = [
  {
    id: 1,
    bgPhoto:
      "https://images.pexels.com/photos/1166990/pexels-photo-1166990.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: "The Concerned Parent",
  },
  {
    id: 2,
    bgPhoto:
      "https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: "The Young Christian",
  },
  {
    id: 3,
    bgPhoto:
      "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: "Marriage Ordained",
  },
  {
    id: 4,
    bgPhoto:
      "https://images.pexels.com/photos/1914984/pexels-photo-1914984.jpeg?auto=compress&cs=tinysrgb&w=800",
    name: "Family fellowship",
  },
];

export default function TopicLinks() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {topics?.map((item) => (
          <Link
            href="/blog?cat=style"
            className={styles.category}
            style={{
              backgroundColor:
                color_list[Math.floor(Math.random() * color_list.length)],
            }}
            key={item.id}
          >
            {item.bgPhoto && (
              <div className={styles.imgContainer}>
                <Image
                  fill
                  src={item.bgPhoto}
                  alt=""
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px 0px 0px 4px",
                  }}
                />
              </div>
            )}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
