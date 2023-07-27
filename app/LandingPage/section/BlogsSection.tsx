"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import BlogCard from "@/app/blogs/BlogCard";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import { useInView } from "react-intersection-observer";

const getBlogs = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogs`);
  return res.data;
};

export default function BlogsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const { data: blogs } = useSWR("blogs", getBlogs);
  const [limit, setLimit] = useState(3);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setLimit(2);
    }
  }, []);
  const limitedBlogs = blogs?.slice(0, limit);

  const renderItems = [];

  for (let i = 0; i < limit; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[440px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-full justify-center items-center p-3">
          <div className="w-full h-full aspect-square rounded-lg">
            <SkeletonLoading />
          </div>
          <div className="w-full h-[5%]">
            <div className="w-[50%] h-full rounded-lg mt-1">
              <SkeletonLoading />
            </div>
          </div>
          <div className="w-full h-[10%] rounded-lg mt-4">
            <SkeletonLoading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-[400px] mx-auto lg:px-0 px-2">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full mb-8">
          <div
            ref={ref}
            className={`font-semibold lg:text-[32px] text-[28px] transition-all duration-1000 ${
              inView
                ? "translate-x-[0%] opacity-100"
                : "translate-x-[-100%] opacity-0"
            }`}
          >
            Newest Blogs
          </div>
          <Link
            href={"/blogs"}
            ref={ref}
            className={`font-semibold text-[18px] hover:underline decoration-2 underline-offset-2 transition-all duration-1000 ${
              inView
                ? "translate-x-[0%] opacity-100"
                : "translate-x-[100%] opacity-0"
            }`}
          >
            View All
          </Link>
        </div>
        <div
          ref={ref}
          className={`w-full grid lg:grid-cols-3 grid-cols-1 gap-4 transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {limitedBlogs ? (
            limitedBlogs?.map((blogs: any, index: number) => (
              <BlogCard key={index} data={blogs} />
            ))
          ) : (
            <>{renderItems}</>
          )}
        </div>
      </div>
    </div>
  );
}
