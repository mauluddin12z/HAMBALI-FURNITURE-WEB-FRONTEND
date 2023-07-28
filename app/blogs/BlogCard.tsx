"use client";
import React from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useRouter } from "next/navigation";

export default function BlogCard({ data, gridCols, gridButtonShow }: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const router = useRouter();
  return (
    <>
      {gridCols === 3 || gridCols === 0 || !gridButtonShow ? (
        <div
          className={`border border-gray-200 rounded-lg transition-all hover:shadow-[0px_2px_16px_0px_rgba(14,30,37,0.32)] overflow-hidden min-h-[440px] p-4`}
        >
          <div className="flex flex-col h-full">
            <div className="relative h-[270px] overflow-hidden rounded-xl mb-2">
              <Link
                href={`/blogs/${URLGenerator(data?.title)}`}
                className="relative h-full cursor-pointer overflow-hidden z-20 flex justify-center items-center"
              >
                <div
                  className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10 rounded-xl`}
                ></div>
                <Image
                  className={`absolute w-full h-full`}
                  loader={myLoader}
                  src={data?.blog_images[0]?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.title}
                  priority
                />
                <Image
                  className={`object-contain w-full h-full z-20 transition-transform duration-500 hover:opacity-80`}
                  loader={myLoader}
                  src={data?.blog_images[0]?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.title}
                  priority
                />
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="z-20 text-gray-400 lg:text-[14px]">
                {format(
                  new Date(data?.createdAt),
                  "EEEE, d MMMM yyyy HH:mm 'WIB'",
                  {
                    locale: id,
                  }
                )}
              </div>
              <div className="flex items-center z-20 mt-1 max-h-[60px]">
                <Link
                  href={`/blogs/${URLGenerator(data?.title)}`}
                  className="text-[20px] font-semibold tracking-tight text-gray-900 text-left hover:underline decoration-2 underline-offset-4 truncate line-clamp-1 whitespace-pre-wrap"
                >
                  {data?.title}
                </Link>
              </div>
              <div
                className="text-[14px] text-gray-400 mt-2 text-justify truncate line-clamp-[3] whitespace-pre-wrap leading-8"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
              <button
                onClick={() =>
                  router.push(`/blogs/${URLGenerator(data?.title)}`)
                }
                type="button"
                className="place-self-end w-48 text-white bg-blue-700 hover:bg-blue-950 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mt-4"
              >
                Read More <i className="fa-solid fa-arrow-right ml-4"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border p-4 rounded-lg flex lg:flex-row flex-col min-h-[340px] shadow">
          <Link
            href={`/blogs/${URLGenerator(data?.title)}`}
            className="w-[30%] h-[324px] relative overflow-hidden z-20 flex justify-center items-center rounded-lg"
          >
            <div
              className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
            ></div>
            <Image
              className={`absolute w-full h-full`}
              loader={myLoader}
              src={data?.blog_images[0]?.imageUrl}
              width={500}
              height={500}
              alt={data?.title}
              priority
            />
            <Image
              className={`object-contain w-full h-full z-20 transition-transform duration-500 hover:opacity-80`}
              loader={myLoader}
              src={data?.blog_images[0]?.imageUrl}
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
                className="text-[14px] text-gray-600 mt-4 text-justify truncate line-clamp-[5] whitespace-pre-wrap leading-8"
                dangerouslySetInnerHTML={{ __html: data?.description }}
              />
              <button
                onClick={() =>
                  router.push(`/blogs/${URLGenerator(data?.title)}`)
                }
                type="button"
                className="place-self-end w-40 text-white bg-blue-700 hover:bg-blue-950 focus:ring-4 focus:ring-blue-300   rounded-lg text-sm px-5 py-2.5 mr-2 mt-4"
              >
                Read More <i className="fa-solid fa-arrow-right ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
