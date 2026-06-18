import { Playfair_Display } from "next/font/google"

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "Terms of Use | O2H Official Site"
}

export default function TermsPage() {
  return (
    <section className="pt-5 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div data-aos="fade-down" data-aos-duration="500">
          <h1 className={`text-4xl ${playfairDisplayBold.className}`}>
            Terms of Use
          </h1>
        </div>
      </div>
    </section>
  )
}