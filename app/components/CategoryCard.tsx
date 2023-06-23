"use client";
import React, { useEffect, useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import useSWR from "swr";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";
import TextEllipsis from "../utils/TextEllipsis";

const getCategoryById = async (id: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category/${id}`
  );
  return res.data;
};

export default function CategoryCard({ category_id, imageUrl, category }: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [isHovered, setIsHovered] = useState(false);

  const mediaQuery = window.matchMedia("(max-width: 1024px)");

  return (
    <>
      <div
        className={`border border-gray-200 overflow-hidden relative `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={`/categories/${URLGenerator(category)}`}
          className={`absolute top-[50%] -translate-y-[50%] bg-primary-color/80 text-center font-extrabold py-4 w-full z-40 text-white ${
            isHovered || mediaQuery.matches ? "opacity-100" : "opacity-0"
          } transition-all duration-300`}
        >
          {category}
        </Link>
        <div className="flex flex-col h-[370px]">
          <div className="relative h-full">
            <Link
              href={`/categories/${URLGenerator(category)}`}
              className="relative h-full cursor-pointer overflow-hidden flex justify-center items-center"
            >
              <div
                className={`${
                  isHovered || mediaQuery.matches
                    ? "bg-black/80 z-30"
                    : "bg-secondary-color/50 z-10"
                } backdrop-blur-sm w-full h-full absolute transition-all duration-300`}
              ></div>
              <Image
                className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                loader={myLoader}
                src={imageUrl}
                width={500}
                height={500}
                alt={category}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
