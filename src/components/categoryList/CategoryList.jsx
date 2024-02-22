import { getCategories } from "@/utils/data";
import styles from "./category.module.css";
import CatLink from "./categoryNav/CategoryNav";

import { AddCategory } from "../AddCategory";
import { auth } from "@/utils/auth";

async function CategoryList() {
  const session = await auth();
  const categories = await getCategories();

  return (
    <>
      <div className="mt-4 border-r-2 min-h-screen">
        <h2 className="mb-4 mt-4 font-semibold text-gray-600 dark:text-white">
          Write? Select Topic..
        </h2>
        <div className="mr-2">
          <div className={styles.links}>
            <AddCategory session={session} />
            {categories &&
              categories.map((cat) => (
                <CatLink
                  item={{
                    ...cat,
                    path: `/dashboard/write?category=${cat.slug}`,
                  }}
                  key={cat.slug}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryList;
