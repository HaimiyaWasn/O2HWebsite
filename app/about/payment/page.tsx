import { Playfair_Display } from "next/font/google"

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "About payment | O2H Official Site"
}

export default function PaymentPage() {
  return (
    <section className="pt-5 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div data-aos="fade-down" data-aos-duration="500">
          <h1 className={`text-4xl ${playfairDisplayBold.className}`}>
            About Payments
          </h1>
        </div>
        <div className="mt-10 space-y-10">
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Payment Information</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Velit debitis quia magnam? Quasi necessitatibus ipsum quas minima soluta, magni et, fugiat, 
              amet voluptatum praesentium quod nostrum suscipit architecto a voluptatem!
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Accepted Payment Methods</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Amet, placeat ipsam laudantium corrupti quo aliquam culpa autem mollitia laborum necessitatibus, 
              in eum consequatur molestiae ullam est eos dolorum distinctio facere.
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Secure Transactions</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Ea minima fugit ratione, explicabo accusantium veritatis blanditiis quis expedita, 
              ab incidunt voluptate repellendus? Placeat odio quos iure in eaque voluptate. Vel.
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Refund and Cancellations</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Numquam officiis earum et, cupiditate quae laudantium omnis. Illo ullam, 
              ipsum facilis ipsam veritatis asperiores fuga, iusto reprehenderit possimus, magnam saepe explicabo!
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Subscription Payments</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Eligendi ullam eveniet veniam, sunt itaque, quaerat in quam dolor reiciendis ipsam dicta, 
              consectetur blanditiis voluptates illo exercitationem doloremque animi iste. Voluptatibus!
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Need Assistance?</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Nesciunt voluptates nostrum, obcaecati adipisci repellendus repudiandae dicta alias quisquam doloremque, 
              corrupti qui eius necessitatibus tempora labore aut? Hic obcaecati libero sed!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}