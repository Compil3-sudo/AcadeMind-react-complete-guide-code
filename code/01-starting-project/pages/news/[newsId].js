import React from "react";
import { useRouter } from "next/router";

// the [] in the filename are important => dynamic page

const DetailPage = () => {
  const router = useRouter();

  const newsId = router.query.newsId;

  // could send a request to the backend API
  // to fetch the news item with newsId

  return <h1>DetailPage</h1>;
};

export default DetailPage;
