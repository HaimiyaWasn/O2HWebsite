import { headers } from "next/headers";

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
};

export default async function getUsers(): Promise<User[]> {
  const host = (await headers()).get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch (`${protocol}://${host}/api/users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data user")
  }

  return response.json();
}