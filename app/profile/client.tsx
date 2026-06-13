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
    <section className="min-h-screen pt-24 px-6 pb-10 justify-center items-center flex overflow-x-hidden">
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

          <h2 className="mt-5 text-3xl font-bold text-center">{user.name}</h2>

          <p className="text-gray-400 text-center mt-1">{user.username}</p>

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
          className="flex-1 border-4 border-yellow-400 p-8 rounded-2xl"
        >
          <div className="border-b border-yellow-400">
            <h2 className="text-3xl font-bold mb-3">Profile</h2>
          </div>

          <div className="space-y-6 mt-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-semibold">{user.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
