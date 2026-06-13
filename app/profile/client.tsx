"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "motion/react";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

export default function ProfileContent() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");

      if (!storedUser) {
        router.replace("/login");
        return;
      }

      const parsedUser: User = JSON.parse(storedUser);

      setUser(parsedUser);
    } catch (error) {
      console.error("Gagal membaca data currentUser:", error);

      localStorage.removeItem("currentUser");
      router.replace("/login");
    }
  }, [router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");

    setUser(null);

    router.replace("/");
  };

  return (
    <section className="min-h-screen pt-24 px-6 pb-10 justify-center items-center flex overflow-x-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          whileHover={{
            y: -4,
          }}
          className="w-full lg:w-80 rounded-3xl border border-yellow-400/50 bg-zinc-900/80 backdrop-blur-md shadow-xl shadow-yellow-400/10 p-7 flex flex-col items-center"
        >
          <Image
            src={user.avatar}
            alt={user.name}
            width={175}
            height={175}
            className="rounded-full object-cover border-4 border-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.35)]"
          />

          <h2 className="mt-5 text-xl md:text-3xl font-bold text-center">
            {user.name}
          </h2>

          <p className="text-gray-400 text-sm md:text-base text-center mt-1">
            {user.username}
          </p>

          <span className="mt-4 rounded-full bg-yellow-400 text-black py-1 px-4 font-semibold text-sm">
            {user.role.toUpperCase()}
          </span>

          <div className="mt-8 w-full border-t border-zinc-700 pt-5">
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-red-600 active:scale-95"
            >
              Logout
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          whileHover={{
            y: -4,
          }}
          className="flex-1 rounded-3xl border border-black/50 bg-linear-to-br from-yellow-300/80 via-yellow-400/80 to-yellow-500/80 backdrop-blur-md shadow-xl shadow-black/10 p-8"
        >
          <div className="border-b border-black/30 pb-5 text-black">
            <h2 className="text-xl md:text-3xl font-bold">
              Welcome Back, {user.name}
            </h2>

            <p className="mt-2 text-sm md:text-base opacity-50">
              Manage your personal information below
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 text-black">
            <div className="rounded-2xl border border-black bg-yellow-500/60 p-5 min-w-0">
              <p className="text-xs md:text-sm opacity-50">Full Name</p>
              <h3 className="mt-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base md:text-xl font-semibold">
                {user.name}
              </h3>
            </div>
            <div className="rounded-2xl border border-black bg-yellow-500/60 p-5 min-w-0">
              <p className="text-xs md:text-sm opacity-50">Username</p>
              <h3 className="mt-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base md:text-xl font-semibold">
                @{user.username}
              </h3>
            </div>
            <div className="rounded-2xl border border-black bg-yellow-500/60 p-5 md:col-span-2 min-w-0">
              <p className="text-xs md:text-sm opacity-50">Email Address</p>

              <h3 className="mt-2 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base md:text-xl font-semibold">
                {user.email}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
