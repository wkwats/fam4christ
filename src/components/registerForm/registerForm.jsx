"use client";
import { useState } from "react";
import styles from "./registerForm.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   state?.success && router.push("api/auth/signin");
  // }, [state?.success, router]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });
    console.log(res);
    if (!res.ok) {
      const response = await res;
      console.log({ ...res });
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("api/auth/signin");
    }
  };

  return (
    <form className={styles.form} method="post" onSubmit={handleSubmit}>
      <input
        type="text"
        required={true}
        value={formData.name}
        placeholder="Full Name"
        id="name"
        name="name"
        onChange={handleChange}
      />
      {/* <input type="text" placeholder="username" name="username" /> */}
      <input
        required={true}
        value={formData.email}
        id="email"
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        required={true}
        value={formData.password}
        id="password"
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <input
        required={true}
        value={formData.passwordRepeat}
        id="passwordRepeat"
        type="password"
        placeholder="Repeat Password"
        name="passwordRepeat"
        onChange={handleChange}
      />

      <button type="submit">Register</button>
      {errorMessage}
      <Link href="api/auth/signin">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
