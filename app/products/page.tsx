"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import ProductCard from "../products/ProductCard";
import Pagination from "../components/Pagination";
import FilterIcon from "@/public/images/filterIcon.svg";
import Link from "next/link";
import SkeletonLoading from "../components/SkeletonLoading";
import FilterByCategory from "./FilterByCategory";

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
  if (searchQuery !== "") {
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
  if (searchQuery !== "") {
    url += `&searchQuery=${searchQuery}`;
  }

  const res = await axios.get(url);
  return res.data;
};

export default function Page() {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(6);
  const [categoryQuery, setCategoryQuery] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (mediaQuery.matches) {
      setLimit(3);
    }
  }, []);

  const { data: products } = useSWR(
    ["products", start, limit, categoryQuery, searchQuery],
    () => getProducts(start, limit, categoryQuery, searchQuery)
  );

  const { data: totalProducts } = useSWR(
    ["totalProducts", categoryQuery, searchQuery],
    () => getTotalProducts(categoryQuery, searchQuery)
  );

  const renderItems = [];

  const [filterVisible, setFilterVisible] = useState(false);

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
          <div className="w-full h-[10%] rounded-lg mt-4">
            <SkeletonLoading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="xl:max-w-7xl lg:max-w-6xl min-h-[600px] mx-auto lg:px-0 px-2 mt-44">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color rounded-lg p-10 text-[12px] lg:text-[16px]">
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
          <FilterByCategory
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setStart={setStart}
            categoryQuery={categoryQuery}
            setCategoryQuery={setCategoryQuery}
          />
          <div className="lg:w-[80%] w-full min-h-[500px] flex flex-col rounded-lg items-center justify-between">
            {products?.length == 0 ? (
              <div className="w-full h-[500px] flex justify-center items-center">
                No product available.
              </div>
            ) : (
              <div className="hidden"></div>
            )}
            <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-4 mb-4">
              {products ? (
                products?.map((products: any, index: number) => (
                  <ProductCard key={index} data={products} />
                ))
              ) : (
                <>{renderItems}</>
              )}
            </div>
            <Pagination
              totalData={totalProducts}
              start={start}
              setStart={setStart}
              limit={limit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
