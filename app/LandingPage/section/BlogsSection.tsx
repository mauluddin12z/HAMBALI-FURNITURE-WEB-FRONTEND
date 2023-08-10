"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BlogCard from "@/app/blogs/BlogCard";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import { useInView } from "react-intersection-observer";
import useBlogsData from "@/app/utils/useBlogsData";

export default function BlogsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const { blogs } = useBlogsData();
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
    <div
      ref={ref}
      className={`xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-[400px] mx-auto xl:px-4 px-2`}
    >
      <div
        className={`flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          inView ? "section-transition-on" : "section-transition-off"
        }`}
      >
        <div className="flex justify-between items-center w-full mb-8 overflow-hidden 2xl:overflow-visible">
          <div className={`font-semibold lg:text-[32px] text-[28px]`}>
            Newest Blogs
          </div>
          <Link
            href={"/blogs"}
            className={`font-semibold text-[18px] hover:underline decoration-2 underline-offset-2`}
          >
            View All
          </Link>
        </div>
        <div className={`w-full grid lg:grid-cols-3 grid-cols-1 gap-4`}>
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
