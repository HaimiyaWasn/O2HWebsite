import Image from "next/image";
import { Bungee } from "next/font/google";

import O2HLogo from "@/public/img/logoO2HBG.jpg";
import RevealOnScroll from "@/app/components/RevealOnScroll";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "About this site | O2H Official Site",
};

export default function MembershipPage() {
  return (
    <section className="pt-5 min-h-screen bg-white">
      <div className="mx-auto max-w-4xl py-20 px-6">
        <div data-aos="zoom-in" data-aos-duration="250">
          <div className="flex justify-center">
            <Image
              src={O2HLogo}
              alt="O2H Logo"
              width={175}
              height={175}
              className="rounded-full object-cover border-2 border-yellow-400 shadow-lg shadow-yellow-400"
            />
          </div>
          <div className="mt-7 text-black text-center">
            <h2 className={`text-4xl tracking-wider ${bungee.className}`}>
              Welcome to O2H Official Site
            </h2>
          </div>
        </div>

        <div data-aos="zoom-in-up" data-aos-duration="500">
          <div className="my-8 flex items-center justify-center">
            <div className="h-px w-96 bg-black" />
            <div className="mx-3 h-2 w-2 rounded-full bg-black" />
            <div className="h-px w-96 bg-black" />
          </div>
        </div>

        <div className="mt-10 text-black text-center space-y-10">
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="text-2xl font-bold">What is O2H?</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              dolore, fugiat animi ab eum maxime accusamus. Quo incidunt
              consequuntur in accusamus, repellendus corporis architecto omnis
              iure error, provident nobis quam! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Hic quaerat rerum voluptas illum id
              sunt eveniet! Dicta magnam optio beatae quibusdam pariatur
              architecto repudiandae, reprehenderit nam odio sunt fugit.
              Corporis. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Optio, nulla ipsum perspiciatis accusamus deserunt, ducimus
              fugit distinctio dolorum minima explicabo libero quaerat, magni
              fuga enim eveniet iure at laboriosam beatae!
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="text-2xl font-bold">What You Can Find Here</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
              libero necessitatibus enim, dolores beatae nostrum cum iure, in
              expedita facere sed! Neque officia distinctio quae fugit tempora
              consectetur velit odio. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Sunt tempora maxime excepturi totam
              exercitationem neque, quae aperiam quam, odit numquam sed
              distinctio! Tempore soluta, ad fuga distinctio porro recusandae
              similique.
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="text-2xl font-bold">Our Goal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              doloremque commodi ipsam cumque alias ipsa veritatis delectus
              iste! Error vel adipisci harum expedita commodi eius odio
              deleniti, quidem sint ipsum. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quibusdam corrupti quisquam quaerat
              excepturi doloribus tenetur itaque incidunt voluptatibus iure
              ipsam explicabo, distinctio nisi consequatur veniam optio animi?
              Magnam, ipsam debitis!
            </p>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-duration="750">
            <h2 className="text-2xl font-bold">Thank You</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
              dolore, fugiat animi ab eum maxime accusamus. Quo incidunt
              consequuntur in accusamus, repellendus corporis architecto omnis
              iure error, provident nobis quam! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
