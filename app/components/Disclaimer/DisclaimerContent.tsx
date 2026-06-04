"use client"

import { createContext, useContext, useState } from "react";


/**
 * Tipe data yang tersedia di dalam Disclaimer Context
 * 
 * accepted:
 * - Menyimpan status apakah pengguna sudah menyetujui disclaimer
 * 
 * setAccepted:
 * - Function untuk mengubah status accepted
 */
type DisclaimerContextType = {
  accepted: boolean;
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Context global untuk menyimpan status disclaimer
 * 
 * Nilai awal dibuat null agar dapat mendeteksi jika hook digunakan diluar Provider
 */
const DisclaimerContext = createContext<DisclaimerContextType | null>(null);

/**
 * Provider yang membungkus aplikasi atau halaman yang membutuhkan akses ke status disclaimer
 * 
 * Contoh penggunaan:
 * <DisclaimerProvider>
 *  <App />
 * </DisclaimerProvider>
 * 
 * Fitur yang cocok menggunakan pola ini:
 * - Disclaimer usia
 * - Persetujuan Terms & Condition
 * - Cookie Consent
 * - Privacy Policy Agreement
 * - Onboarding Completion
 */
export function DisclaimerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * Menyimpan status apakah disclaimer sudah disetujui oleh pengguna
   * 
   * false = belum menyetujui
   * true = sudah menyetujui
   */
  const [accepted, setAccepted] = useState(false);

  return (
    <DisclaimerContext.Provider value={{ accepted, setAccepted }}>
      {children}
    </DisclaimerContext.Provider>
  );
}

/**
 * Custom Hook untuk mengakses Disclaimer Context
 * 
 * Dengan hook ini komponen tidak perlu memanggil:
 * - useContext(DisclaimerContext)
 * 
 * Cukup:
 * - const { accepted, setAccepted } = useDisclaimer
 */
export function useDisclaimer() {
  const context = useContext(DisclaimerContext);

  /**
   * Mencegah penggunaan hook di luar Provider
   * 
   * Contoh salah:
   * <Component />
   * 
   * Contoh benar:
   * <DisclaimerProvider>
   *  <Component />
   * </DisclaimerProvider>
   */
  if (!context) {
    throw new Error("useDisclaimer must be used within a DisclaimerProvider");
  }

  return context;
}