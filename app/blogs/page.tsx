"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import BlogCard from "./BlogCard";
import Pagination from "../components/Pagination";
import Link from "next/link";
import SkeletonLoading from "../components/SkeletonLoading";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

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
  const router = useRouter();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(6);
  const [gridCols, setGridCols] = useState<number | null>(null);

  useEffect(() => {
    const savedCols = localStorage.getItem("gridCols");
    setGridCols(savedCols ? Number(savedCols) : 3);
  }, []);

  const [gridButtonShow, setGridButtonShow] = useState(false);

  const handleGridCols = (cols: any) => {
    setGridCols(cols);
    localStorage.setItem("gridCols", cols);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (mediaQuery.matches) {
      setLimit(3);
      localStorage.removeItem("gridCols");
      router.push("/blogs");
      setGridButtonShow(false);
    } else {
      setGridButtonShow(true);
    }
  }, [router]);

  const { data: blogs } = useSWR(["blogs", start, limit], () =>
    getBlogs(start, limit)
  );

  const { data: totalBlogs } = useSWR("totalBlogs", getTotalBlogs);

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
    <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-screen mx-auto lg:px-0 px-2 mt-44">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">Blogs</div>
        </div>
        <div className="flex lg:justify-start justify-between items-center w-full mb-4">
          <div className="font-semibold lg:text-[36px] text-[28px]">Blogs</div>
        </div>
        <div className="flex gap-x-2 w-full mb-4 lg:h-10">
          {gridButtonShow && (
            <>
              <button
                className={`border focus:outline-none bg-white  border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 rounded-lg p-2 flex justify-center items-center hover:text-primary-color shadow ${
                  gridCols === 3 ? "text-primary-color" : "text-gray-900"
                }`}
                onClick={() => {
                  handleGridCols(3);
                }}
              >
                <div className="w-6 h-6 text-[20px] flex justify-center items-center">
                  <i className="fa-solid fa-grip"></i>
                </div>
              </button>
              <button
                className={`border focus:outline-none bg-white  border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 rounded-lg p-2 flex justify-center items-center hover:text-primary-color shadow ${
                  gridCols === 1 ? "text-primary-color" : "text-gray-900"
                }`}
                onClick={() => {
                  handleGridCols(1);
                }}
              >
                <div className="w-6 h-6 text-[20px] flex justify-center items-center">
                  <i className="fa-solid fa-list"></i>
                </div>
              </button>
            </>
          )}
        </div>
        <div className="w-full min-h-[500px] flex flex-col rounded-lg items-center justify-between">
          {blogs?.length == 0 ? (
            <div className="w-full h-[500px] flex justify-center items-center border">
              No blog available.
            </div>
          ) : (
            <div className="hidden"></div>
          )}
          <div
            className={`w-full grid lg:grid-cols-${
              gridCols === null ? 3 : gridCols
            } grid-cols-1 gap-4 mb-4`}
          >
            {blogs ? (
              blogs?.map((blogs: any, index: number) => (
                <BlogCard
                  key={index}
                  gridCols={gridCols}
                  gridButtonShow={gridButtonShow}
                  data={blogs}
                />
              ))
            ) : (
              <>{renderItems}</>
            )}
          </div>
          <Pagination
            totalData={totalBlogs}
            start={start}
            setStart={setStart}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
}
