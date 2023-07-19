"use client";
import React, { useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import TextEllipsis from "../utils/TextEllipsis";

export default function BlogCard({ imageUrl, title, createdAt }: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  return (
    <>
      <div className={`border border-gray-200 overflow-hidden p-6 h-[500px]`}>
        <div className="flex flex-col h-full">
          <div className="relative h-[80%] flex-shrink-0">
            <Link
              href={`/blogs/${URLGenerator(title)}`}
              className="relative h-full cursor-pointer overflow-hidden z-20 flex justify-center items-center"
            >
              <div
                className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
              ></div>
              <Image
                className={`absolute w-full h-full`}
                loader={myLoader}
                src={imageUrl}
                width={500}
                height={500}
                alt={title}
              />
              <Image
                className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                loader={myLoader}
                src={imageUrl}
                width={500}
                height={500}
                alt={title}
              />
            </Link>
          </div>
          <div className="h-[10%] z-20 text-gray-400 mt-1 text-[14px]">
            {format(new Date(createdAt), "EEEE, d MMMM yyyy HH:mm 'WIB'", {
              locale: id,
            })}
          </div>
          <div className="h-[20%] flex items-center z-20 mt-2">
            <Link
              href={`/blogs/${URLGenerator(title)}`}
              className="text-[18px] font-semibold tracking-tight text-gray-900 text-left hover:underline decoration-2 underline-offset-4"
            >
              {TextEllipsis(title, 36)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
