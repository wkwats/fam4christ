import { auth } from "@/utils/auth";
import styles from "./profile.module.css";
import Image from "next/image";

import { UpdateUser } from "../ui/userupdate";

const Profile = async () => {
  const session = await auth();
  console.log(session.user);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.user}>
          <div className={styles.headersec}>
            <span className={styles.miniheader}>User Details</span>
          </div>
          <UpdateUser session={session} />
          <span className={styles.name}>Name: {session?.user?.name}</span>
          <span className={styles.email}>Email: {session?.user?.email}</span>
        </div>
        <div className={styles.imagecontainer}>
          <Image
            src={session?.user?.image ? session?.user?.image : "/user.png"}
            className={styles.image}
            fill
          />
        </div>
      </div>

      <div className={styles.bio}>
        <div className={styles.headersec}>
          <span className={styles.miniheader}>User Bio</span>
        </div>
        <p className={styles.bio}>{session?.user?.bio ?? session?.user?.bio}</p>
      </div>
    </div>
  );
};

export default Profile;
