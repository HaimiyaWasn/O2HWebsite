import { Playfair_Display } from "next/font/google"

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "Request to customers | O2H Official Site"
}

export default function RequestCustomerPage() {
  return (
    <section className="pt-5 min-h-screen">
      <div className="mx-auto max-w-4xl py-20 px-6">
        <h1 className={`text-4xl ${playfairDisplayBold.className}`}>
          Request to Customers
        </h1>
      </div>
    </section>
  )
}