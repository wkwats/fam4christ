import Link from "next/link";
import React from "react";

const DeniedPage = () => {
  return (
    <div>
      <h1>You are not allowed to view this page</h1>
      <Link href={"/"}>Home</Link>
    </div>
  );
};

export default DeniedPage;
