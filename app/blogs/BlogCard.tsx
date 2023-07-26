"use client";
import React from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
export default function BlogCard({ data, gridCols, gridButtonShow }: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  return (
    <>
      {gridCols === 3 || gridCols === 0 || !gridButtonShow ? (
        <div
          className={`border border-gray-200 rounded-lg shadow overflow-hidden h-[440px]`}
        >
          <div className="flex flex-col h-full">
            <div className="relative h-[75%] overflow-hidden">
              <Link
                href={`/blogs/${URLGenerator(data?.title)}`}
                className="relative h-full cursor-pointer overflow-hidden z-20 flex justify-center items-center"
              >
                <div
                  className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
                ></div>
                <Image
                  className={`absolute w-full h-full`}
                  loader={myLoader}
                  src={data?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.title}
                  priority
                />
                <Image
                  className={`object-contain w-full h-full z-20 transition-transform duration-500 hover:opacity-80`}
                  loader={myLoader}
                  src={data?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.title}
                  priority
                />
              </Link>
            </div>
            <div className="flex flex-col h-[25%] p-4">
              <div className="z-20 text-gray-400 lg:text-[14px]">
                {format(
                  new Date(data?.createdAt),
                  "EEEE, d MMMM yyyy HH:mm 'WIB'",
                  {
                    locale: id,
                  }
                )}
              </div>
              <div className="flex items-center z-20 mt-1">
                <Link
                  href={`/blogs/${URLGenerator(data?.title)}`}
                  className="text-[18px] font-semibold tracking-tight text-gray-900 text-left hover:underline decoration-2 underline-offset-4 truncate line-clamp-2 whitespace-pre-wrap"
                >
                  {data?.title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border p-4 rounded-lg flex lg:flex-row flex-col h-[300px]">
          <Link
            href={`/blogs/${URLGenerator(data?.title)}`}
            className="w-[30%] relative h-full overflow-hidden z-20 flex justify-center items-center rounded-lg"
          >
            <div
              className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
            ></div>
            <Image
              className={`absolute w-full h-full`}
              loader={myLoader}
              src={data?.imageUrl}
              width={500}
              height={500}
              alt={data?.title}
              priority
            />
            <Image
              className={`object-contain w-full h-full z-20 transition-transform duration-500 hover:opacity-80`}
              loader={myLoader}
              src={data?.imageUrl}
              width={500}
              height={500}
              alt={data?.title}
              priority
            />
          </Link>
          <div className="w-[70%] lg:ml-10 py-2 ">
            <div className="flex flex-col">
              <Link
                href={`/blogs/${URLGenerator(data?.title)}`}
                className="text-[22px] font-semibold tracking-tight text-gray-900 hover:underline decoration-2 underline-offset-4 mb-1"
              >
                {data?.title}
              </Link>
              <div className="z-20 text-gray-400 mt-1 text-[14px]">
                {format(
                  new Date(data?.createdAt),
                  "EEEE, d MMMM yyyy HH:mm 'WIB'",
                  {
                    locale: id,
                  }
                )}
              </div>
              <div
                className="text-[14px] text-gray-600 mt-4 text-justify truncate line-clamp-[8] whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
