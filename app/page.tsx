import Navbar from "./components/Navbar";
import LastestNews from "./components/LastestNews";
import CarouselAlbum from "./components/CarouselAlbum";
import Hero from "./components/HeroPageUtama";
import HomeStorePageCard from "./components/StoreHome";
import Footer from "./components/Footer";
import FloatingLogo from "./components/FABLogo";

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