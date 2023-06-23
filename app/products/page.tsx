"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import FilterIcon from "@/public/images/filterIcon.svg";
import Link from "next/link";

const getProducts = async (
  start: number,
  limit: number,
  categoryQuery: number,
  searchQuery: string
) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?start=${start}&limit=${limit}`;

  if (categoryQuery > 0) {
    url += `&categoryQuery=${categoryQuery}`;
  }
  if (searchQuery !== null) {
    url += `&searchQuery=${searchQuery}`;
  }

  const res = await axios.get(url);
  return res.data;
};

const getTotalProducts = async (categoryQuery: number, searchQuery: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?`;

  if (categoryQuery > 0) {
    url += `&categoryQuery=${categoryQuery}`;
  }
  if (searchQuery !== null) {
    url += `&searchQuery=${searchQuery}`;
  }

  const res = await axios.get(url);
  return res.data;
};

const getCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category`
  );
  return res.data;
};

export default function Page() {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(6);
  const [categoryQuery, setCategoryQuery] = useState(-1);
  const [dataLength, setDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setLimit(3);
    }
  }, []);

  const { data } = useSWR(
    ["products", start, limit, categoryQuery, searchQuery],
    () => getProducts(start, limit, categoryQuery, searchQuery)
  );

  const categories = useSWR("categories", getCategories);
  const totalProducts = useSWR(
    ["totalProducts", categoryQuery, searchQuery],
    () => getTotalProducts(categoryQuery, searchQuery)
  );

  const renderItems = [];

  useEffect(() => {
    if (totalProducts.data) {
      setDataLength(totalProducts.data.length);
    }
    setCurrentPage(Math.floor(start / limit) + 1);
  }, [totalProducts.data, start, limit, currentPage]);

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

  const [filterVisible, setFilterVisible] = useState(false);

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
          <div className="w-full h-full aspect-square bg-secondary-color rounded-lg animate-pulse"></div>
          <div className="w-full h-[10%] bg-secondary-color rounded-lg mt-4 animate-pulse"></div>
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
          <div className="text-black text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">Products</div>
        </div>
        <div className="flex lg:justify-start justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">
            Products
          </div>
          <button
            className="border border-gray-200/80 rounded-lg p-2 flex justify-center items-center lg:hidden"
            onClick={() => setFilterVisible(true)}
          >
            <div className="w-6 h-6">
              <FilterIcon />
            </div>
            <span className="ml-2">Filter</span>
          </button>
        </div>
        <div className={`flex w-full h-full justify-center`}>
          <div
            className={`lg:w-[20%] w-full flex-grow lg:rounded-lg p-5 lg:flex flex-col ${
              filterVisible
                ? "flex justify-center fixed inset-0 z-50"
                : "hidden"
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
                      setCategoryQuery(categories.category_id),
                        setStart(0),
                        setSearchQuery("");
                    }}
                  >
                    {categories.category}
                  </button>
                ))}
              </div>
              <button
                className="w-full my-2 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 cursor-pointer"
                onClick={() => {
                  setCategoryQuery(-1), setStart(0);
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
          <div className="lg:w-[80%] w-full min-h-[500px] flex flex-col rounded-lg items-center justify-between">
            {data?.length == 0 ? (
              <div className="w-full h-ful h-[500px] flex justify-center items-center">
                No product available.
              </div>
            ) : (
              <div className="hidden"></div>
            )}
            <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-4 mb-4">
              {data ? (
                data?.map((products: any, index: number) => (
                  <ProductCard
                    key={index}
                    imageUrl={products.imageUrl}
                    product_id={products.product_id}
                    product_name={products.product_name}
                    dimensions={products.dimensions}
                  />
                ))
              ) : (
                <>{renderItems}</>
              )}
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
    </div>
  );
}
