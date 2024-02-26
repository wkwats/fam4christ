import styles from "./about.module.css";
import ContactPage from "./contact/Contact";

export const metadata = {
  title: "About Page | Families For Christ",
  description: "About Families For Christ",
};

const About = async () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Families for Christ: Cultivating Unity and Faithful Connections
      </h1>
      <div className={styles.wrapper}>
        <div className={styles.textContainer}>
          <div className={styles.textdiv}>
            <b>Establishing Supportive Ties: </b>
            <p>
              Devoted to fostering a welcoming community, bringing together
              families who share a profound faith in Christ.
            </p>
            <b>A Wealth of Resources:</b>
            <p>
              Discover our website's array of enriching materials, including
              daily devotionals, family-centric activities, and valuable
              parenting insights deeply rooted in Christian principles.
            </p>
            <b>Interactive Community Forum:</b>
            <p>
              Engage in meaningful conversations with like-minded individuals,
              sharing personal experiences and providing encouragement within
              our supportive online forum.
            </p>
            <b>Building Foundational Strength:</b>
            <p>
              Our overarching mission is to fortify family bonds, deepen
              spiritual connections, and guide families through life's
              challenges with unwavering faith and resilience.
            </p>
            <b>Embrace the Journey: </b>
            <p>
              {" "}
              Become a cherished member of our community, where we collectively
              uplift, inspire, and support one another on the shared path of
              faith and family. Join us at Families for Christ and embark on a
              journey of connection and spiritual growth.
            </p>
          </div>

          <div className={styles.boxes}>
            <div className={styles.box}>
              <h1>100</h1>
              <p>Authors</p>
            </div>
            <div className={styles.box}>
              <h1>10 K+</h1>
              <p>Articles Written</p>
            </div>
            <div className={styles.box}>
              <h1>100 K+</h1>
              <p>Unique Views</p>
            </div>
          </div>
        </div>
        <ContactPage />
      </div>
    </div>
  );
};

export default About;
