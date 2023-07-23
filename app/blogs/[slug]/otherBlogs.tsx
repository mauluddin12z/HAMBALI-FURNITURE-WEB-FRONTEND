"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import URLGenerator from "@/app/utils/URLGenerator";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const getOtherBlogs = async (blogId: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}otherBlogs?blogIdQuery=${blogId}`;

  const res = await axios.get(url);
  return res.data;
};

export default function OtherBlogs({ blogId }: any) {
  const { data: otherBlogs }: any = useSWR(
    blogId ? ["otherBlogs", blogId] : null,
    () => blogId && getOtherBlogs(blogId)
  );
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const [visibleRelatedItem, setvisibleRelatedItem] = useState(4);
  const otherProductSliced = otherBlogs?.slice(0, visibleRelatedItem);

  const renderItems = [];

  for (let i = 0; i < visibleRelatedItem; i++) {
    renderItems.push(
      <div
        key={i}
        className="w-full h-full border border-gray-200 rounded-lg shadow"
      >
        <div className="w-full h-full flex justify-center items-center p-3">
          <div className="w-full h-full aspect-square rounded-lg">
            <SkeletonLoading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="font-semibold text-[24px] mb-8">Other Blogs</div>
      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
        {otherProductSliced
          ? otherProductSliced?.map((otherBlogs: any, index: number) => (
              <div
                key={index}
                className={`border border-gray-200 shadow overflow-hidden p-4 h-[400px]`}
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-[80%]">
                    <Link
                      href={`/blogs/${URLGenerator(otherBlogs.title)}`}
                      className="relative h-full cursor-pointer overflow-hidden z-20 flex justify-center items-center"
                    >
                      <div
                        className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
                      ></div>
                      <Image
                        className={`absolute w-full h-full`}
                        loader={myLoader}
                        src={otherBlogs.imageUrl}
                        width={500}
                        height={500}
                        alt={otherBlogs.title}
                      />
                      <Image
                        className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                        loader={myLoader}
                        src={otherBlogs.imageUrl}
                        width={500}
                        height={500}
                        alt={otherBlogs.title}
                      />
                    </Link>
                  </div>
                  <div className="z-20 text-gray-400 mt-1 text-[14px]">
                    {format(
                      new Date(otherBlogs.createdAt),
                      "EEEE, d MMMM yyyy HH:mm 'WIB'",
                      {
                        locale: id,
                      }
                    )}
                  </div>
                  <div className="flex items-center z-20 mt-2">
                    <Link
                      href={`/blogs/${URLGenerator(otherBlogs.title)}`}
                      className="text-[18px] font-semibold tracking-tight text-gray-900 text-left hover:underline decoration-2 underline-offset-4 truncate line-clamp-2 whitespace-pre-wrap"
                    >
                      {otherBlogs.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : renderItems}
      </div>
    </div>
  );
}
