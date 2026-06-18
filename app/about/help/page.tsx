import { Playfair_Display } from "next/font/google"

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "FAQ | O2H Official Site"
}

export default function FAQPage() {
  return (
    <section className="pt-5 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className={`text-4xl ${playfairDisplayBold.className}`}>
          Pertanyaan yang sering ditanyakan
        </h1>
      </div>
    </section>
  )
}