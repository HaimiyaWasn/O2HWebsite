import Navbar from "../components/Navbar";
import FloatingLogo from "../components/FloatingLogo";
import SearchStore from "./search/searchClient";

export default function Stores() {
  return (
    <>
      <title>Store | O2H Website Center</title>
      <Navbar />
      <div className="flex justify-center px-4 mt-20">
        <SearchStore />
      </div>

      <FloatingLogo />
    </>
  );
}
