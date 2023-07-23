"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import BlogCard from "@/app/blogs/BlogCard";
import SkeletonLoading from "@/app/components/SkeletonLoading";

const getBlogs = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogs`);
  return res.data;
};

export default function BlogsSection() {
  const { data:blogs } = useSWR("blogs", getBlogs);
  const [limit, setLimit] = useState(4);
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
        className="h-[350px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-[350px] justify-center items-center p-3">
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
    <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-[400px] mx-auto lg:px-0 px-4">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">Blogs</div>
          <Link
            href={"/blogs"}
            className="font-semibold text-[18px] hover:underline decoration-2 underline-offset-2"
          >
            View All
          </Link>
        </div>
        <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-4">
          {limitedBlogs ? (
            limitedBlogs?.map((blogs: any, index: number) => (
              <BlogCard
                key={index}
                imageUrl={blogs.imageUrl}
                blog_id={blogs.blog_id}
                title={blogs.title}
                createdAt={blogs.createdAt}
              />
            ))
          ) : (
            <>{renderItems}</>
          )}
        </div>
      </div>
    </div>
  );
}
