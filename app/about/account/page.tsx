import { Playfair_Display } from "next/font/google";

const playfairDisplayBold = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "About accounts | O2H Official Site",
};

export default function AccountPage() {
  return (
    <section className="pt-5 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className={`text-4xl ${playfairDisplayBold.className}`}>
          About Accounts
        </h1>
        <div className="mt-10 space-y-10">
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Why Create Account?</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              tempore fuga quam a laborum illum possimus eaque facilis aut quod,
              perferendis nam minus accusamus magni obcaecati error dolores.
              Velit, illum.
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Features Available to Members</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Id quibusdam et, tenetur, similique placeat voluptatem voluptatibus expedita repellat unde aliquid, 
              libero exercitationem perferendis ex dicta corrupti vitae inventore officiis ipsam.
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Account Responsibilities</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Corrupti rerum ipsum consequuntur est, facilis molestiae, 
              alias tempora assumenda error voluptatem doloribus laudantium saepe architecto illum vero modi dolorem minima debitis.
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Privacy and Security</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
              Quasi voluptatum in, culpa cumque, impedit facilis porro maxime possimus accusantium nostrum voluptates minus, 
              animi asperiores ab veritatis inventore? Officiis, doloribus odio.
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="font-bold text-lg">Need Help?</h2>
            <div className="mb-5 flex justify-center items-center">
              <div className="h-px w-full bg-neutral-400" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Ratione sint tenetur quas accusamus ducimus sapiente rem esse autem officiis molestias omnis earum sit eligendi accusantium, 
              cupiditate provident vero cum aliquid?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
