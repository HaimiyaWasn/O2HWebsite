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

  return (
    <section className="pt-20 px-6">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="shrink-0">
          <Image
            src={user.avatar}
            alt={user.name}
            width={180}
            height={180}
            className="rounded-full object-cover border"
          />
        </div>

        {/* Detail User */}
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nama</p>
            <h2 className="text-2xl font-bold">{user.name}</h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p>{user.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}