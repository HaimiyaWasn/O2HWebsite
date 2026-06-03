import LastestNews from "./components/LastestNews";
import CarouselAlbum from "./components/CarouselAlbum";
import Hero from "./components/HeroPageUtama";
import HomeProductsPageCard from "./components/ProductsHome";

export default function Home() {
  return (
    <>
      <title>O2H Official Site</title>
      <Hero />
      <HomeProductsPageCard />
      <CarouselAlbum />
      <LastestNews />
    </>
  );
}