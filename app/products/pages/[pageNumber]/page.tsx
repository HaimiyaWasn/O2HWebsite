import NewsClient from "../../client";
import { getProducts } from "../../data";
import { notFound } from "next/navigation"; // Halaman 404

// Tipe props
type Props = {
  params: Promise<{
    pageNumber: string;
  }>;
};

// Halaman pagination berita
export default async function PaginationPage({ params }: Props) {
  const { pageNumber } = await params;

  // Konversi nomor halaman
  const currentPage = Number(pageNumber);

  // Validasi halaman
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  // Ambil data berita
  const { products, totalPages } = await getProducts(currentPage);

  // Jika halaman melebihi total
  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <NewsClient
      allProducts={products} // Data berita untuk halaman ini
      totalPages={totalPages} // Total halaman
      currentPage={currentPage} // Halaman saat ini
    />
  );
}
