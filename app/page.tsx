import LastestNews from "./components/LastestNews";
import CarouselAlbum from "./components/CarouselAlbum";
import Hero from "./components/HeroPageUtama";
import HomeProductsSection from "./components/ProductsHome";

export default function Home() {
  return (
    <>
      <title>O2H Official Site</title>
      <Hero />
      <HomeProductsSection />
      <CarouselAlbum />
      <LastestNews />
    </>
  );
}