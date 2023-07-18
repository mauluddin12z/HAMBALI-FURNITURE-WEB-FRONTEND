"use client";
import React from "react";
import axios from "axios";
import useSWR from "swr";
import { usePathname, useRouter } from "next/navigation";

const getCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category`
  );
  return res.data;
};
export default function FilterByCategory({
  filterVisible,
  setFilterVisible,
  searchQuery,
  setSearchQuery,
  setStart,
  categoryQuery,
  setCategoryQuery,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const categories = useSWR("categories", getCategories);
  return (
    <div
      className={`lg:w-[20%] w-full flex-grow lg:rounded-lg p-5 lg:flex flex-col ${
        filterVisible ? "flex justify-center fixed inset-0 z-50" : "hidden"
      } mr-4 border lg:static bg-white`}
    >
      <button
        className={`p-4 absolute top-0 right-0 text-[24px] z-50 ${
          !filterVisible && "hidden"
        }`}
        onClick={() => setFilterVisible(false)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="p-2">
        <div className="relative text-gray-600 w-full mb-6 flex justify-between border border-gray-300 bg-white h-10 px-6 rounded-lg">
          <div className="flex lg:justify-center lg:pr-5 w-full">
            <input
              className="text-sm focus:outline-none w-full"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value), setStart(0);
              }}
            />
          </div>
          <div
            className={`flex justify-center items-center flex-grow ${
              searchQuery !== "" && "cursor-pointer"
            }`}
          >
            <i
              className={`fa-solid ${
                searchQuery !== "" ? "fa-xmark" : "fa-magnifying-glass"
              }`}
              onClick={() => searchQuery !== "" && setSearchQuery("")}
            ></i>
          </div>
        </div>
      </div>
      <div className="font-semibold text-[24px] mb-6 text-center">
        Categories
      </div>
      <div className="p-2 overflow-y-auto lg:overflow-visible">
        <div className="flex flex-col items-center justify-center gap-y-2">
          {categories.data?.map((categories: any, index: number) => (
            <button
              key={index}
              className={`w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none ${
                categoryQuery === categories.category_id
                  ? "bg-primary-color text-white"
                  : "bg-white hover:text-primary-color"
              } rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-200 cursor-pointer w-full"`}
              onClick={() => {
                setCategoryQuery(categories.category_id);
                setStart(0);
                setSearchQuery("");
                router.push(pathname);
              }}
            >
              {categories.category}
            </button>
          ))}
        </div>
        <button
          className="w-full my-2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer"
          onClick={() => {
            setCategoryQuery(-1);
            setStart(0);
            setSearchQuery("");
            router.push(pathname);
          }}
        >
          View all
        </button>
        <div className="lg:hidden flex justify-center items-center gap-x-2">
          <button
            className="py-2.5 px-5 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-red-600 hover:bg-gray-100 hover:text-red-600 focus:z-10 focus:ring-4 focus:ring-red-200 cursor-pointer w-full"
            onClick={() => {
              setCategoryQuery(-1), setStart(0), setSearchQuery("");
            }}
          >
            Clear All
          </button>
          <button
            className="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer w-full"
            onClick={() => setFilterVisible(false)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
