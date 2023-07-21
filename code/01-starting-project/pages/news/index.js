import React from "react";
import Link from "next/link";

const NewsPage = () => {
  return (
    <>
      <h1>NewsPage</h1>
      <ul>
        <li>
          <Link href="/news/nextjs">NextJS is a great framework</Link>
        </li>
        <li>something</li>
      </ul>
    </>
  );
};

export default NewsPage;
