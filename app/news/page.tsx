import { headers } from "next/headers";
import NewsClient from "./client";

type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
}

export default async function News() {
  const headersList = await headers();
  const host = headersList.get("host");

  const res = await fetch(`http://${host}/api/news`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  };

  const allNews: News[] = await res.json();

  const sortedNews = allNews.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const limitaAllNews = allNews.slice(0, 10);

  return <NewsClient allNews={limitaAllNews} />;
}