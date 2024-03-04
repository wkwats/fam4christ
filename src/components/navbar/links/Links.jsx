import AuthLinks from "@/components/authLinks/AuthLinks";
import styles from "./links.module.css";
import NavLink from "./navlink/Nav";
import { auth } from "@/utils/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { nameInitials } from "@/utils/logic";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  // {
  //   title: "Authors",
  //   path: "/authors",
  // },
];

const logout = {
  title: "Logout",
  path: "/api/auth/signout?callbackUrl=/",
};
const login = {
  title: "Login",
  path: "/api/auth/signin",
};
const dashboard = {
  title: "Dashboard",
  path: "/dashboard",
};

const Links = async () => {
  const session = await auth();
  const isAdmin = session?.user?.role == "admin";
  const isAuthor = session?.user?.role == "author";
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {(isAdmin || isAuthor) && <NavLink item={dashboard} />}

        {session ? (
          <div className={styles.linkava}>
            <NavLink item={logout} key={logout.title} />

            <Avatar>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>
                {nameInitials(session?.user?.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <NavLink item={login} key={login.title} />
        )}
      </div>
    </div>
  );
};

export default Links;
