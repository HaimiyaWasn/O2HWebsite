import Navbar from "./components/navbar";
import LastestNews from "./components/LastestNews";
import CarouselAlbum from "./components/carouselAlbum";
import Hero from "./components/heroPageUtama";
import HomeStorePageCard from "./components/StoreHome";
import Footer from "./components/footer";
import FloatingLogo from "./components/floatingLogo";

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