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
import BlogImageSwiper from "./BlogImageSwiper";

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
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex flex-col w-full">
            <div className="font-bold text-[30px] mb-10">
              {blogByName?.title}
            </div>
            {blogByName ? (
              <>
                {blogByName.blog_images && (
                  <BlogImageSwiper data={blogByName} />
                )}
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
                  className="text-[14px] text-gray-600 mt-4 text-justify leading-8 flex flex-col description"
                  dangerouslySetInnerHTML={{ __html: blogByName?.description }}
                />
              </>
            ) : (
              <>
                <div className="w-full h-[400px] mb-2">
                  <SkeletonLoading />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 mb-2 gap-4">
                  <div className="h-[200px]">
                    <SkeletonLoading />
                  </div>
                  <div className="h-[200px]">
                    <SkeletonLoading />
                  </div>
                  <div className="h-[200px] lg:block hidden">
                    <SkeletonLoading />
                  </div>
                  <div className="h-[200px] lg:block hidden">
                    <SkeletonLoading />
                  </div>
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
          <div className="w-full">
            <OtherBlogs blogId={blogByName?.blog_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
