"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import Image, { ImageLoader } from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import OtherBlogs from "./otherBlogs";

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
  const { data: blogByName }: any = useSWR(
    titleQuery ? ["blogByName", titleQuery] : null,
    () => titleQuery && getBlogByTitle(titleQuery)
  );

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  return (
    <div className="max-w-7xl min-h-screen mx-auto lg:px-0 px-2 mt-44">
      <div className="flex flex-col w-full">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color/60 rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <Link href={"/blogs"} className="text-black hover:text-primary-color">
            Blogs
          </Link>
          <div className="text-black">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">{blogByName?.title}</div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col lg:w-[70%] w-full">
            <div className="font-semibold text-[32px] mb-8">Blogs</div>
            {blogByName ? (
              <>
                <div className="relative h-96 overflow-hidden z-20 flex justify-center items-center">
                  <div
                    className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
                  ></div>
                  <Image
                    className={`absolute w-full h-full`}
                    loader={myLoader}
                    src={blogByName?.imageUrl}
                    width={500}
                    height={500}
                    alt={blogByName?.title}
                    priority
                  />
                  <Image
                    className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                    loader={myLoader}
                    src={blogByName?.imageUrl}
                    width={500}
                    height={500}
                    alt={blogByName?.title}
                    priority
                  />
                </div>
                <div className="font-semibold text-[24px] mt-4">
                  {blogByName?.title}
                </div>
                <div className="mt-2 text-[16px] text-gray-400">
                  {format(
                    new Date(blogByName?.createdAt),
                    "EEEE, d MMMM yyyy HH:mm 'WIB'",
                    {
                      locale: id,
                    }
                  )}
                </div>
                <div
                  className="text-[14px] text-gray-600 mt-4 text-justify"
                  dangerouslySetInnerHTML={{ __html: blogByName?.description }}
                />
              </>
            ) : (
              <>
                <div className="w-full h-96 mb-2">
                  <SkeletonLoading />
                </div>
                <div className="w-[300px] h-8 mb-2">
                  <SkeletonLoading />
                </div>
                <div className="w-[300px] h-4 mb-8">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-4 mb-2">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-4 mb-2">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-4 mb-2">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-4 mb-2">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-4 mb-2">
                  <SkeletonLoading />
                </div>
              </>
            )}
            <div className="flex flex-col">
              <div className="font-semibold text-[24px] mt-10">Share:</div>
              <div className="flex gap-x-4">
                <Link
                  href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                  target="_blank"
                  className="font-bold text-[24px] text-green-600 hover:text-green-800 transition-colors"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </Link>
                <Link
                  href={`https://www.facebook.com/share.php?u=${currentUrl}`}
                  target="_blank"
                  className="font-bold text-[24px] text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <i className="fa-brands fa-facebook"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:w-[30%] w-full">
            <OtherBlogs blogId={blogByName?.blog_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
