import Image from "next/image";
import styles from "./miniProfile.module.css";

export default function MiniProfile({ user }) {
  return (
    <div className={styles.container}>
      <div className={styles.miniProfile}>
        <div
          className={styles.authorTitle}
        >{`Blog page by: ${user?.name}`}</div>
        <div className={styles.userImg}>
          {user?.image && (
            <Image
              // src="https://images.pexels.com/photos/19972137/pexels-photo-19972137/free-photo-of-moose-in-the-snow.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              src={user?.image}
              alt="Authors Profile photo"
              fill
              className={styles.image}
              style={{
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          )}
        </div>

        <div className={styles.authorTitle}>Bio</div>
        <div className={styles.authorBio}>
          {/* <p>A Father, a Brother Who loves God ....</p> */}
        </div>
        {/* <div className={styles.buttons}>
          <button>Clap</button>
          <button>Dismiss</button>
        </div> */}
      </div>
    </div>
  );
}
