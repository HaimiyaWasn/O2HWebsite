import { NextResponse } from "next/server";

const baseUsers = [
  {
    id: 1,
    username: "adminw123",
    name: "Admin Wasn",
    email: "admin@o2h.com",
    password: "admin123",
    role: "admin",
    avatar: "/img/profileIconDefault.jpg",
    createdAt: "2026-01-01",
  },
  {
    id: 2,
    username: "lucmywaif143y",
    name: "Lucy",
    email: "lucy@gmail.com",
    password: "lucy123",
    role: "user",
    avatar: "/img/profileIconDefault.jpg",
    createdAt: "2026-03-15",
  },
  {
    id: 3,
    username: "davidmar123",
    name: "David Martinez",
    email: "david@gmail.com",
    password: "david123",
    role: "user",
    avatar: "/img/profileIconDefault.jpg",
    createdAt: "2026-04-20",
  },
];

export async function GET() {
  return NextResponse.json(baseUsers);
}