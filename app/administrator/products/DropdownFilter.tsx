"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
import useCategoriesData from "@/app/utils/useCategoriesData";
import useCategoryByNameData from "@/app/utils/useCategoryByNameData";

export default function DropdownFilter({
  categoryQuery,
  setCategoryQuery,
  setStart,
  setSearchQuery,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownShowed, setisDropdownShowed] = useState(false);
  const [categoryName, setCategoryName] = useState("");

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
    setIsLoading(false);
    router.push(newUrl);
  };

  useEffect(() => {
    setCategoryName(searchParams.get("category") ?? "");
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col relative w-full z-[20]">
        <button
          className="flex justify-between items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 lg:w-44 w-full"
          type="button"
          onClick={() => setisDropdownShowed((prev) => !prev)}
        >
          {categoryName ? categoryName : "Category"}
          <i className="fa-solid fa-chevron-down ml-4"></i>
        </button>
        <div
          className={`bg-white divide-y divide-gray-100 rounded-lg border shadow lg:w-44 w-full absolute bottom-0 translate-y-[100%]  ${
            isDropdownShowed ? "block" : "hidden"
          }`}
        >
          <ul className={`py-2 text-sm text-gray-700`}>
            {categories &&
              categories?.map((categories: any, index: number) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setisDropdownShowed(false);
                      setStart(0);
                      setSearchQuery("");
                      handleCategoryChange(categories);
                    }}
                    className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                  >
                    {categories.category}
                  </button>
                </li>
              ))}
            <li>
              <button
                onClick={() => {
                  setCategoryName("");
                  setCategoryQuery(-1);
                  setisDropdownShowed(false);
                  setStart(0);
                  setSearchQuery("");
                  router.push(pathname);
                }}
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                View All
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
}
