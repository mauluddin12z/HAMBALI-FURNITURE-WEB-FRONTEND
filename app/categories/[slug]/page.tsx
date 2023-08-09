"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import ProductCard from "@/app/products/ProductCard";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import Pagination from "@/app/components/Pagination";
import MainLayout from "@/app/components/MainLayout";
import useCategoryByNameData from "@/app/utils/useCategoryByNameData";
import useFilteredProductsData from "@/app/utils/useFilteredProductsData";

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

  const { categoryByName } = useCategoryByNameData(categoryParams);

  useEffect(() => {
    setCategoryQuery(categoryByName?.category_id);
  }, [categoryByName]);

  const [filter, setFilter] = useState({});
  useEffect(() => {
    setFilter({
      start: start,
      limit: limit,
      categoryQuery: categoryQuery,
      searchQuery: searchQuery,
    });
  }, [start, limit, categoryQuery, searchQuery]);

  const { filteredProducts, totalFilteredProducts } =
    useFilteredProductsData(filter);
  const productsByCategory = filteredProducts;
  const totalProductsByCategory = totalFilteredProducts;

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
    <MainLayout>
      <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-screen mx-auto 2xl px-0 xl:px-4 px-2 mt-44">
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
    </MainLayout>
  );
}
