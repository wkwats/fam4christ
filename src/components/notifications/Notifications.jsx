import styles from "./notifications.module.css";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new article!",
    description: "1 hour ago",
  },
  {
    title: "New article published!",
    description: "2 hours ago",
  },
];

const Notifications = () => {
  return (
    <div>
      <div className={styles.notifications}>
        <h2 className={styles.subtitle}>{"Notifications"}</h2>
        <div>
          {notifications?.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
