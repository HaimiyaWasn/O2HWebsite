"use client"

import { useEffect, useState } from "react";

import { useDisclaimer } from "./disclaimerContent";
import DisclaimerScene from "./disclaimerScene";

/**
 * Wrapper untuk mengontrol lifecycle Disclaimer
 * 
 * Tugas utama: 
 * - Menampilkan disclaimer saat halaman pertama kali dibuka
 * - Mengunci scroll halaman ketika disclaimer aktif
 * - Menyimpan status bahwa pengguna sudah menyetujui disclaimer
 * - Menutup disclaimer setelah tombol konfirmasi ditekan
 * 
 * Cocok digunakan untuk:
 * - Disclaimer Portfolio
 * - Terms & Conditions
 * - Cookie Consent
 * - Privacy Policy
 * - Age Verification
 */
export default function DisclaimerWrapper() {
  /**
   * Menentukan apakah modal disclaimer masih ditampilkan atau tidak 
   * 
   * true = Disclaimer ditampilkan 
   * false = Disclaimer ditutup
   * 
   */
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  /**
   * Mengambil fungsi untuk menyimpan status bahwa pengguna telah menerima disclaimer
   */
  const { setAccepted } = useDisclaimer();

  /**
   * Mengunci scroll halaman ketika disclaimer aktif
   * 
   * overflow: "hidden" = Pengguna tidak bisa scroll halaman utama
   * 
   * overflow: "auto" = Scroll kembali normal
   */
  useEffect(() => {
    if(showDisclaimer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    };

    /**
     * Cleanup ketika componen di-unmount agar scroll halaman selalu kembali normal
     */
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDisclaimer]);

  /**
   * Dipanggil ketika pengguna menekan tombol "Saya Mengerti"
   * 
   * Langkah: 
   * 1. Simpan status accepted ke Context
   * 2. Sembunyikan disclaimer
   */
  const handleClose = () => {
    setAccepted(true);
    setShowDisclaimer(false);
  };

  /**
   * Jika disclaimer sudah ditutup, tidak perlu merender apapun
   */
  if(!showDisclaimer) return null;

  /**
   * Menampilkan modal disclaimer
   */
  return <DisclaimerScene onClose={handleClose} />
}