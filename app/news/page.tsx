import Navbar from "../components/Navbar";
import FloatingLogo from "../components/FloatingLogo";
import Footer from "../components/Footer";

type News = {
  id: number;
  date: string;
  title: string;
  slug: string;
}

export default function News() {
  return (
    <>
      <title>News | O2H Website Center</title>
      <Navbar />
      <section>

      </section>
      {/* <Footer variant="yellow" /> */}
      <FloatingLogo />
    </>
  );
}
