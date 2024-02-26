"use client";

import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Page",
  description: "Contact description",
};

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <b>Reach out to us</b> we would like to hear from you, let us connect
        with you, or or maybe you would like to contribute as a writer, reach
        out using the form below and we shall get back to you.{" "}
      </h2>
      <form action="" className={styles.form}>
        <input type="text" placeholder="Name and Surname" />
        <input type="text" placeholder="Email Address" />
        <input type="text" placeholder="Phone Number (Optional)" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Message"
        ></textarea>
        <button>Send</button>
      </form>
    </div>
  );
};

export default ContactPage;
