"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import URLGenerator from "@/app/utils/URLGenerator";
import ProductCard from "@/app/products/ProductCard";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import Pagination from "@/app/components/Pagination";

const getCategoryByName = async (categoryParams: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}categoryByName?categoryQuery=${categoryParams}`;

  const res = await axios.get(url);
  return res.data;
};

const getProductsByCategory = async (
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

const getTotalProductsByCategory = async (
  categoryQuery: number,
  searchQuery: string
) => {
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

export default function Page({ params }: { params: { slug: string } }) {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState(-1);
  const [categoryParams, setCategoryParams] = useState(
    URLToStringGenerator(params.slug)
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (mediaQuery.matches) {
      setLimit(4);
    }
  }, []);

  const { data: categoryByName }: any = useSWR(
    categoryParams ? ["categoryByName", categoryParams] : null,
    () => categoryParams && getCategoryByName(categoryParams)
  );

  useEffect(() => {
    setCategoryQuery(categoryByName?.category_id);
  }, [categoryByName]);

  const { data: productsByCategory } = useSWR(
    ["products", start, limit, categoryQuery, searchQuery],
    () => getProductsByCategory(start, limit, categoryQuery, searchQuery)
  );

  const { data: totalProductsByCategory } = useSWR(
    ["totalProductsByCategory", categoryQuery, searchQuery],
    () => getTotalProductsByCategory(categoryQuery, searchQuery)
  );

  const renderItems = [];

  for (let i = 0; i < 1; i++) {
    const cardRenderItems = [];
    for (let j = 0; j < 8; j++) {
      cardRenderItems.push(
        <div
          key={j}
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
    renderItems.push(
      <div key={i} className="flex flex-col w-full mb-28">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[300px] h-8 mb-4">
            <SkeletonLoading />
          </div>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 border-b py-10">
          {cardRenderItems}
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
          <Link
            href={"/categories"}
            className="text-black hover:text-primary-color"
          >
            Categories
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">{categoryParams}</div>
        </div>
        <div className="w-full min-h-[500px] flex flex-col rounded-lg items-center justify-between">
          {categoryByName && (
            <div className="flex flex-col w-full mb-28">
              <div className="mb-6">
                <div className="font-bold text-[24px] mb-4">
                  {categoryByName.category.toUpperCase()}
                </div>
              </div>
              <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 border-b pb-10">
                {productsByCategory &&
                  productsByCategory?.map((products: any, index: number) => (
                    <div key={index} className={`w-full h-full`}>
                      <ProductCard data={products} />
                    </div>
                  ))}
                {productsByCategory && productsByCategory?.length == 0 && (
                  <div className="w-full flex justify-center items-center col-span-4 h-[400px]">
                    No product available.
                  </div>
                )}
              </div>
            </div>
          )}
          {!productsByCategory && <>{renderItems}</>}
          <Pagination
            totalData={totalProductsByCategory}
            start={start}
            setStart={setStart}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
}
