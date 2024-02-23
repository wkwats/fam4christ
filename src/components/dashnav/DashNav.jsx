import styles from "./dashnav.module.css";
import NavLink from "../navbar/links/navlink/Nav";

const links = [
  {
    title: "Dash",
    path: "/dashboard",
  },

  {
    title: "Profile",
    path: "/dashboard/profile",
  },
];

function DashNav() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
      </div>
    </div>
  );
}

export default DashNav;
