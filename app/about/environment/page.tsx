import { Playfair_Display } from "next/font/google"

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "System requirements | O2H Official Site"
}

export default function EnvironmentPage() {
  return (
    <section className="pt-5 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className={`text-4xl ${playfairDisplayBold.className}`}>
          System Requirements
        </h1>
      </div>
    </section>
  )
}