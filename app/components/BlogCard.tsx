"use client";
import React, { useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import useSWR from "swr";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";
import TextEllipsis from "../utils/TextEllipsis";

const getBlogById = async (id: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogs/${id}`
  );
  return res.data;
};

export default function BlogCard({ blog_id, imageUrl, title, createdAt }: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [blogId, setBlogId] = useState(blog_id);

  const blogById: any = useSWR(
    blog_id ? ["productById", blog_id] : null,
    () => blog_id && getBlogById(blog_id)
  );

  return (
    <>
      <div className={`border border-gray-200 overflow-hidden p-6`}>
        <div className="flex flex-col h-[370px]">
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
              {TextEllipsis(title, 56)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
