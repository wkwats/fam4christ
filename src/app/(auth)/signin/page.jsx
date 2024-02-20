import Image from "next/image";
import styles from "./signin.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src="/login.png"
          alt="ffc png"
          style={{
            objectFit: "cover",
            borderRadius: "4px",
          }}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.right}>
        <form className={styles.mainForm}>
          <div className={styles.group}>
            <input
              className={styles.basicSlide}
              type="email"
              placeholder="Your favorite email"
            />
          </div>
          <div className={styles.group}>
            <input
              className={styles.basicSlide}
              type="password"
              placeholder="Your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
