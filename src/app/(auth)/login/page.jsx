import LoginForm from "@/components/loginForm/loginForm";

import styles from "./login.module.css";
import { handleGithubLogin, handleGoogleLogin } from "@/utils/actions";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <form action={handleGoogleLogin}>
          <button className={styles.github}>Login with Google</button>
        </form>
        {/* <LoginForm /> */}
      </div>
    </div>
  );
};

export default LoginPage;
