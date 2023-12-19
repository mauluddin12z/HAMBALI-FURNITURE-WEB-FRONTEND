"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "../components/Pagination";
import SkeletonLoading from "../components/SkeletonLoading";
import { usePathname, useRouter } from "next/navigation";
import MainLayout from "../components/MainLayout";
import useFilteredBlogsData from "../utils/useFilteredBlogsData";
import BreadcrumbNavigation from "../components/breadcrumbNavigation";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [gridCols, setGridCols] = useState<number | null>(null);
  const [filter, setFilter] = useState({});
  useEffect(() => {
    setFilter({
      start: start,
      limit: limit,
      searchQuery: searchQuery,
    });
  }, [start, limit, searchQuery]);

  const { filteredBlogs, totalFilteredBlogs } = useFilteredBlogsData(filter);

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

  const renderItems = [];
  for (let i = 0; i < limit; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[440px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-full p-3">
          <div className="w-full h-full aspect-square rounded-lg">
            <SkeletonLoading />
          </div>
          <div className="w-[50%] h-[13px] rounded-lg mt-1">
            <SkeletonLoading />
          </div>
          <div className="w-[80%] h-[25px] rounded-lg mt-3">
            <SkeletonLoading />
          </div>
          <div className="flex flex-col w-full gap-y-3 mt-4">
            <div className="w-full h-[13px] rounded-lg">
              <SkeletonLoading />
            </div>
            <div className="w-full h-[13px] rounded-lg">
              <SkeletonLoading />
            </div>
            <div className="w-full h-[13px] rounded-lg">
              <SkeletonLoading />
            </div>
            <div className="w-full h-[13px] rounded-lg">
              <SkeletonLoading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const breadcrumbNavigationItem = {
    pathHistory: [
      {
        pathname: "Home",
        link: "/",
      },
    ],
    currentPath: {
      pathname: "Blogs",
    },
  };
  return (
    <MainLayout>
      <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-screen mx-auto 2xl:px-0 xl:px-4 px-2 mt-44">
        <div className="flex flex-col justify-center items-center">
          <BreadcrumbNavigation
            breadcrumbNavigationItem={breadcrumbNavigationItem}
          />
          <div className="flex lg:justify-start justify-between items-center w-full mb-4">
            <div className="font-semibold lg:text-[36px] text-[28px]">
              Blogs
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap justify-between w-full mb-4 items-center">
            <div className="flex gap-x-2 w-full lg:h-10">
              {gridButtonShow && (
                <>
                  <button
                    aria-label="grid3cols"
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
                    aria-label="grid1cols"
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
            <div className="relative h-full lg:w-auto w-full">
              <div
                onClick={() => setSearchQuery("")}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchQuery("");
                  }
                }}
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 cursor-pointer"
              >
                <i
                  className={`fa-solid ${
                    searchQuery != "" ? "fa-xmark" : "fa-magnifying-glass"
                  }`}
                ></i>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg lg:w-80 w-full bg-gray-50 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                placeholder="Search for items"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setStart(0);
                  router.push(pathname);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchQuery("");
                  }
                }}
              />
            </div>
          </div>
          <div className="w-full min-h-[500px] flex flex-col rounded-lg items-center justify-between">
            {filteredBlogs?.length == 0 ? (
              <div className="w-full h-[500px] flex justify-center items-center border rounded-lg">
                No blog available.
              </div>
            ) : (
              <div className="hidden"></div>
            )}
            <div
              className={`w-full grid lg:grid-cols-${
                gridCols ?? 3
              } grid-cols-1 gap-4 mb-4`}
            >
              {filteredBlogs ? (
                filteredBlogs?.map((blogs: any, index: number) => (
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
              totalData={totalFilteredBlogs}
              start={start}
              setStart={setStart}
              limit={limit}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
