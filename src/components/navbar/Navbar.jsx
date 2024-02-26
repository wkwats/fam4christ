import Link from "next/link";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Image from "next/image";
import { auth } from "@/utils/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
      </div>
      <div className={styles.logo}>
        <Link href={"/"} className={styles.logo}>
          <Image src="/logotp1.png" alt="FFC" width={150} height={150} />
        </Link>
      </div>
      <div className={styles.links}>
        <Links />
      </div>
    </div>

    // <div className={styles.container}>
    //   <Link href={"/"} className={styles.logo}>
    //     <Image src="/logotp1.png" alt="FFC" width={150} height={150} />
    //   </Link>
    //   <div className={styles.links}>
    //     <Links />
    //   </div>
    // </div>
  );
};

export default Navbar;
