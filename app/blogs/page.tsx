"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import Link from "next/link";

const getBlogs = async (start: number, limit: number) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredBlogs?start=${start}&limit=${limit}`;
  const res = await axios.get(url);
  return res.data;
};

const getTotalBlogs = async () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogs`;

  const res = await axios.get(url);
  return res.data;
};

export default function Page() {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(8);
  const [dataLength, setDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setLimit(3);
    }
  }, []);

  const { data } = useSWR(["blogs", start, limit], () =>
    getBlogs(start, limit)
  );

  const totalBlogs = useSWR("totalBlogs", getTotalBlogs);

  const renderItems = [];

  useEffect(() => {
    if (totalBlogs.data) {
      setDataLength(totalBlogs.data.length);
    }
    setCurrentPage(Math.floor(start / limit) + 1);
  }, [totalBlogs.data, start, limit, currentPage]);

  const totalPages = Math.ceil(dataLength / limit);

  const pageRange = 2;

  let startPage = Math.max(currentPage - pageRange, 1);
  let endPage = Math.min(currentPage + pageRange, totalPages);

  if (currentPage - pageRange <= 1) {
    endPage = Math.min(endPage + (pageRange - (currentPage - 1)), totalPages);
  }

  if (currentPage + pageRange >= totalPages) {
    startPage = Math.max(
      startPage - (pageRange - (totalPages - currentPage)),
      1
    );
  }

  let pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  for (let i = 0; i < limit; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[350px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-[350px] justify-center items-center p-3">
          <div className="w-full h-full aspect-square bg-primary-color/20 rounded-lg animate-pulse"></div>
          <div className="w-full h-[5%]">
            <div className="w-[50%] h-full bg-primary-color/20 rounded-lg mt-1 animate-pulse"></div>
          </div>
          <div className="w-full h-[10%] bg-primary-color/20 rounded-lg mt-4 animate-pulse"></div>
        </div>
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
          <div className="text-gray-400">Blogs</div>
        </div>
        <div className="flex lg:justify-start justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">Blogs</div>
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
              ? data?.map((blogs: any, index: number) => (
                  <BlogCard
                    key={index}
                    imageUrl={blogs.imageUrl}
                    blog_id={blogs.blog_id}
                    title={blogs.title}
                    createdAt={blogs.createdAt}
                  />
                ))
              : renderItems}
          </div>
          <Pagination
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            setStart={setStart}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
}
