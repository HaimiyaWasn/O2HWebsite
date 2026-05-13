import Navbar from "./components/NavbarO2H";
import LastestNews from "./components/LastestNews";
import CarouselAlbum from "./components/CarouselAlbum";
import Hero from "./components/HeroPageUtama";
import HomeStorePageCard from "./components/ProductsHome";
import Footer from "./components/Footer";
import FloatingLogo from "./components/FloatingLogo";

export default function Home() {
  return (
    <>
      <title>O2H Official Site</title>
      <Navbar />
      <Hero />
      <LastestNews />
      <CarouselAlbum />
      <HomeStorePageCard />
      <Footer variant="yellow" />
      <FloatingLogo />
    </>
  );
}