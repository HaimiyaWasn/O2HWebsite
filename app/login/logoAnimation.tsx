"use client";

import Image from "next/image";
import { motion } from "motion/react";

import LogoO2H from "@/public/img/logoO2HNoBG.png";

/**
 * Komponen animasi logo O2H
 *
 * Fitur:
 * - Fade In (muncul perlahan)
 * - Zoom In (membesar dari ukuran kecil)
 * - Floating Animation (naik turun terus menerus)
 *
 * Cocok digunakan untuk:
 * - Halaman Login
 * - Halaman Register
 * - Splash Screen
 * - Hero Section
 * - Landing Page
 */
export default function LogoAnimation() {
  return (
    <motion.div
      /**
       * Kondisi awal sebelum animasi berjalan
       *
       * opacity: 0  -> tidak terlihat
       * scale: 0.3  -> ukuran 30% dari ukuran asli
       */
      initial={{
        opacity: 0,
        scale: 0.3,
      }}

      /**
       * Kondisi setelah animasi berjalan
       *
       * opacity: 1      -> tampil penuh
       * scale: 1        -> ukuran normal
       * y: [0,-10,0]    -> bergerak naik lalu kembali turun
       */
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}

      /**
       * Pengaturan durasi animasi
       */
      transition={{
        /**
         * Durasi fade in
         */
        opacity: {
          duration: 0.8,
        },

        /**
         * Durasi zoom in
         */
        scale: {
          duration: 0.8,
        },

        /**
         * Animasi floating (naik turun)
         *
         * duration : 3 detik
         * repeat   : berjalan terus menerus
         * ease     : gerakan halus
         */
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
