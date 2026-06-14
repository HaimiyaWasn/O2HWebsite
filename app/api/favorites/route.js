import { NextResponse } from "next/server";

const baseFavorites = [
  {

  }
]

export async function GET() {
  return NextResponse.json(baseFavorites);
}