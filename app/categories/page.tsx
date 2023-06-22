"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import Link from "next/link";
import CategoryCard from "../components/CategoryCard";

const getCategories = async (start: number, limit: number) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category`;
  const res = await axios.get(url);
  return res.data;
};

export default function Page() {
  const { data } = useSWR("catgories", getCategories);

  const renderItems = [];

  for (let i = 0; i < 9; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[350px] w-full border border-gray-200 bg-secondary-color animate-pulse shadow"
      >
      </div>
    );
  }
  return (
    <div className="lg:max-w-7xl md:max-w-6xl min-h-screen mx-auto lg:px-0 px-4 mt-36">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color/60 rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">Categories</div>
        </div>
        <div className="flex lg:justify-start justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">Categories</div>
        </div>
        <div className="w-full min-h-[500px] flex flex-col rounded-lg items-center justify-between">
          {data?.length == 0 ? (
            <div className="w-full h-[500px] flex justify-center items-center border">
              No blog available.
            </div>
          ) : (
            <div className="hidden"></div>
          )}
          <div className="w-full grid lg:grid-cols-4 grid-cols-1 gap-4 mb-4">
            {data
              ? data?.map((category: any, index: number) => (
                  <CategoryCard
                    key={index}
                    imageUrl={category.imageUrl}
                    category_id={category.category_id}
                    category={category.category}
                  />
                ))
              : renderItems}
          </div>
        </div>
      </div>
    </div>
  );
}
