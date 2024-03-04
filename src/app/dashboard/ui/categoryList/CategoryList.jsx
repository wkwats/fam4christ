import { getCategories } from "@/utils/data";
import styles from "./category.module.css";
import CatLink from "./categoryNav/CategoryNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddCategory } from "../AddCategory";
import { auth } from "@/utils/auth";
import { nameInitials } from "@/utils/logic";

const sidebarlinks = [
  {
    title: "Dash",
    path: "/dashboard",
  },

  {
    title: "Profile",
    path: "/dashboard/profile",
  },
];

async function CategoryList() {
  const session = await auth();
  const user = session?.user;
  const categories = await getCategories();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{nameInitials(user?.name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className={styles.username}>
            <span className={styles.name}>{user?.name}</span>
            <span className={styles.email}>{user?.email}</span>
          </div>
        </div>

        <div className={styles.links}>
          <AddCategory session={session} />
          {/* <h2 className="mb-4 mt-4 font-semibold text-gray-600 dark:text-white"> */}
          <div className={styles.headersec}>
            <span className={styles.miniheader}>Write? Select a Topic.</span>
          </div>
          {categories &&
            categories?.map((cat) => (
              <CatLink
                item={{
                  ...cat,
                  path: `/dashboard/write?category=${cat.slug}`,
                }}
                key={cat.slug}
              />
            ))}
        </div>
        <div className={styles.links}>
          <div className={styles.headersec}>
            <span className={styles.miniheader}>Other Links</span>
          </div>
          {sidebarlinks &&
            sidebarlinks?.map((link) => (
              <CatLink
                item={{
                  ...link,
                }}
                key={link.title}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default CategoryList;
