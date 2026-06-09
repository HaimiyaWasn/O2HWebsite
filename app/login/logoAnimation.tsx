"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import LogoO2H from "@/public/img/logoO2HNoBG.png";

export default function LogoAnimation() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.3,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: {
          duration: 0.8,
        },
        scale: {
          duration: 0.8,
        },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <Image src={LogoO2H} alt="O2H Logo" width={350} height={350} priority />
    </motion.div>
  );
}
