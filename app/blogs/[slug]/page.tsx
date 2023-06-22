"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import Image, { ImageLoader } from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

const getBlogByTitle = async (blogTitleQuery: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogByTitle?blogTitleQuery=${blogTitleQuery}`;

  const res = await axios.get(url);
  return res.data;
};

export default function Page({ params }: { params: { slug: string } }) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const [titleQuery, setTitleQuery] = useState(
    URLToStringGenerator(params.slug)
  );
  const { data }: any = useSWR(
    titleQuery ? ["blogByName", titleQuery] : null,
    () => titleQuery && getBlogByTitle(titleQuery)
  );

  return (
    <div className="max-w-7xl min-h-screen mx-auto lg:px-0 px-4 mt-36">
      <div className="flex flex-col w-full">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color/60 rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">Blogs</div>
        </div>
        <div className="relative h-96 flex-shrink-0">
          {data ? (
            <div className="relative h-full overflow-hidden z-20 flex justify-center items-center">
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
              />
              <Image
                className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                loader={myLoader}
                src={data?.imageUrl}
                width={500}
                height={500}
                alt={data?.title}
              />
            </div>
          ) : (
            <>
              <div className="w-full h-full bg-secondary-color animate-pulse rounded-lg"></div>
            </>
          )}
        </div>
        <div className="mt-2 text-[16px] text-gray-400">
          {data ? (
            format(new Date(data?.createdAt), "EEEE, d MMMM yyyy HH:mm 'WIB'", {
              locale: id,
            })
          ) : (
            <>
              <div className="w-56 h-6 bg-secondary-color animate-pulse rounded-lg"></div>
            </>
          )}
        </div>
        {data ? (
          <>
            <div className="text-[26px] font-extrabold mt-4">{data?.title}</div>
            <div
              className="text-[14px] text-gray-600 mt-4 text-justify"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          </>
        ) : (
          <>
            <div className="w-full h-[38px] bg-secondary-color animate-pulse rounded-lg mt-4"></div>
            <div className="w-full h-72 bg-secondary-color animate-pulse rounded-lg mt-4"></div>
          </>
        )}
      </div>
    </div>
  );
}
