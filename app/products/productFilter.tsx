"use client";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import useCategoriesData from "../utils/useCategoriesData";
import useCategoryByNameData from "../utils/useCategoryByNameData";

export default function ProductFilter({
  filterVisible,
  setFilterVisible,
  searchQuery,
  setSearchQuery,
  setStart,
  categoryQuery,
  setCategoryQuery,
}: any) {
  useEffect(() => {
    if (filterVisible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [filterVisible]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { categories } = useCategoriesData();
  const { categoryByName } = useCategoryByNameData(categoryName);

  useEffect(() => {
    setCategoryQuery(
      categoryByName ? categoryByName?.category_id : categoryQuery
    );
  }, [
    setCategoryQuery,
    categoryQuery,
    categoryByName,
    categoryByName?.category_id,
  ]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = async (categories: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const newUrl = `${pathname}?${createQueryString(
      "category",
      categories.category
    )}`;
    setCategoryName(categories.category);
    setCategoryQuery(categories.category_id);
    setStart(0);
    setIsLoading(false);
    router.push(newUrl);
  };
  const handleSearch = async (e: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    setSearchQuery(e.target.value);
    setStart(0);
  };

  useEffect(() => {
    setCategoryName(searchParams.get("category") ?? "");
  }, [searchParams]);

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
                handleSearch(e);
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
      <div className="p-2 h-[67%]">
        <div className="flex flex-col items-center gap-y-2 max-h-[80%] lg:max-h-full overflow-auto lg:overflow-visible lg:p-0 p-2">
          {categories?.map((categories: any, index: number) => (
            <button
              key={index}
              className={`w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none ${
                categoryQuery === categories.category_id
                  ? "bg-primary-color text-white"
                  : "bg-white hover:text-primary-color"
              } rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-blue-200 cursor-pointer w-full"`}
              onClick={() => {
                handleCategoryChange(categories);
              }}
            >
              {categories.category}
            </button>
          ))}
          <button
            className="sticky bottom-0 w-full py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer"
            onClick={() => {
              setCategoryName("");
              setCategoryQuery(-1);
              setStart(0);
              setSearchQuery("");
              router.push(pathname);
            }}
          >
            View all
          </button>
        </div>
        <div className="lg:hidden flex justify-center items-center gap-x-2 p-2">
          <button
            className="py-2.5 px-5 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-red-600 hover:bg-gray-100 hover:text-red-600 focus:z-10 focus:ring-4 focus:ring-red-200 cursor-pointer w-full"
            onClick={() => {
              setCategoryName("");
              setCategoryQuery(-1);
              setStart(0);
              setSearchQuery("");
              router.push(pathname);
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
      {isLoading && (
        <span>
          <Loading />
        </span>
      )}
    </div>
  );
}
