import { headers } from "next/headers";

export default async function getUsers() {
  const host = (await headers()).get("host");

  const protocol = 
    process.env.NODE_ENV === "development"
      ? "http"
      : "https";

  const response  = await fetch (
    `${protocol}://${host}/api/users`,
    {
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data users");
  }

  return response.json();
}