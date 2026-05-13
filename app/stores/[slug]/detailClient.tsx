"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { FaArrowAltCircleRight } from "react-icons/fa";

type Products = {
  id: number;
  title: string;
  price: string;
  image: string;
  sold: string;
  slug: string;
}

export default function DetailClient({ products }: { products: Products }) {
  return (
    <>

    </>
  )
}