import { NextResponse } from "next/server";

const newsData = [
  {
    id: 1,
    date: "2026.01.22",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    slug: "/news/lorem-1",
  },
  {
    id: 2,
    date: "2026.01.18",
    title: "Lorem ipsum dolor sit amet, sed do eiusmod tempor",
    slug: "/news/lorem-2",
  },
  {
    id: 3,
    date: "2026.01.10",
    title: "Lorem ipsum dolor sit amet, ut labore et dolore",
    slug: "/news/lorem-3",
  },
  {
    id: 4,
    date: "2025.12.28",
    title: "Lorem ipsum dolor sit amet, quis nostrud exercitation",
    slug: "/news/lorem-4",
  },
  {
    id: 5,
    date: "2025.12.20",
    title: "Lorem ipsum dolor sit amet, duis aute irure dolor",
    slug: "/news/lorem-5",
  },
  {
    id: 6,
    date: "2025.12.12",
    title: "Lorem ipsum dolor sit amet, ex ea commodo consequat",
    slug: "/news/lorem-6",
  },
  {
    id: 7,
    date: "2025.12.12",
    title: "Lorem ipsum dolor sit amet consectetur, qui distinctio rem iusto ipsa modi cum",
    slug: "/news/lorem-7",
  },
  {
    id: 8,
    date: "2025.12.10",
    title: "Lorem ipsum dolor sit amet, commodi minima corrupti quisquam architecto dignissimos",
    slug: "/news/lorem-8",
  },
  {
    id: 9,
    date: "2025.08.25",
    title: "Lorem ipsum dolor sit amet, amet tempore ab praesentium unde",
    slug: "/news/lorem-9",
  },
  {
    id: 10,
    date: "2025.08.17",
    title: "Lorem ipsum dolor sit amet doloremque illo ex natus sunt sed aliquid",
    slug: "/news/lorem-10",
  },
  {
    id: 11,
    date: "2025.07.14",
    title: "Lorem ipsum dolor sit amet laborum perspiciatis, nihil, nam commodi autem recusandae quam explicabo",
    slug: "/news/lorem-11",
  },
  {
    id: 12,
    date: "2025.12.13",
    title: "Lorem ipsum dolor sit amet, rem illum quas hic esse quam laborum",
    slug: "/news/lorem-12",
  },
  {
    id: 13,
    date: "2025.05.07",
    title: "Lorem ipsum dolor sit amet dignissimos cupiditate reiciendis officiis suscipit",
    slug: "/news/lorem-13",
  },
  {
    id: 14,
    date: "2026.05.04",
    title: "Lorem ipsum dolor sit amet veritatis consectetur aspernatur minima",
    slug: "/news/lorem-14",
  },
  {
    id: 15,
    date: "2025.03.13",
    title: "Lorem ipsum dolor sit amet, culpa voluptas repudiandae corporis provident",
    slug: "/news/lorem-15",
  },
  {
    id: 16,
    date: "2025.05.16",
    title: "Lorem ipsum dolor sit amet, voluptate nemo dolore temporibus debitis",
    slug: "/news/lorem-16",
  },
  {
    id: 17,
    date: "2026.09.15",
    title: "Lorem ipsum dolor sit amet tempora quos excepturi, est eligendi animi accusantium, culpa voluptast",
    slug: "/news/lorem-17",
  },
  {
    id: 18,
    date: "2026.07.28",
    title: "Lorem ipsum dolor sit amet, nihil distinctio unde ipsa, id non labore",
    slug: "/news/lorem-18",
  },
  {
    id: 19,
    date: "2026.04.23",
    title: "Lorem ipsum dolor sit amet magni aspernatur nam impedit excepturi",
    slug: "/news/lorem-19",
  },
  {
    id: 20,
    date: "2025.02.13",
    title: "Lorem ipsum dolor sit amet ratione quia, ducimus optio a accusamus dicta iure magni autem",
    slug: "/news/lorem-20",
  },
];

export async function GET() {
  return NextResponse.json(newsData);
}