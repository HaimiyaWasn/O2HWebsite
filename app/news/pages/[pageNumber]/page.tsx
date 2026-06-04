import NewsClient from "../../client";
import { getNews } from "../../data";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    pageNumber: string;
  }>;
};

export default async function PaginationPage({ params }: Props) {
  const { pageNumber } = await params;

  const currentPage = Number(pageNumber);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const { news, totalPages } = await getNews(currentPage);

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <NewsClient
      allNews={news}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
