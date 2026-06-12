"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
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
    <section className="min-h-screen pt-24 px-6 pb-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="w-full lg:w-80 border-4 border-yellow-400 rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <Image
            src={user.avatar}
            alt={user.name}
            width={180}
            height={180}
            className="rounded-full object-cover border-2 border-yellow-400"
          />

          <h2 className="mt-5 text-3xl font-bold text-center">{user.name}</h2>
          <p className="text-gray-500 text-center">{user.username}</p>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 py-3 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-500"
          >
            Logout
          </button>
        </div>
        <div className="flex-1 border-4 border-yellow-400 p-8 rounded-2xl">
          <h2 className="text-3xl font-bold mb-8">Profile</h2>

          <div className="space-y-6">
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
        </div>
      </div>
    </section>
  );
}
