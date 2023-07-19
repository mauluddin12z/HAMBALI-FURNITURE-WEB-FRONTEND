"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import SkeletonLoading from "../components/SkeletonLoading";
import URLGenerator from "../utils/URLGenerator";
import ProductCard from "../products/ProductCard";
const getCategories = async () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category`;
  const res = await axios.get(url);
  return res.data;
};

const getProductByCategory = async () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products`;
  const res = await axios.get(url);
  return res.data;
};

export default function Page() {
  const { data: categories } = useSWR("categories", getCategories);
  const { data: productsByCategory } = useSWR(
    "productsByCategory",
    getProductByCategory
  );

  const renderItems = [];

  for (let i = 0; i < 2; i++) {
    const cardRenderItems = [];
    for (let j = 0; j < 4; j++) {
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
          <div className="w-[100px] h-4">
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
    <div className="lg:max-w-7xl md:max-w-6xl min-h-screen mx-auto lg:px-0 px-4 mt-36">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color/60 rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">Categories</div>
        </div>
        <div className="flex lg:justify-start justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">
            Categories
          </div>
        </div>
        <div className="w-full min-h-[500px] flex flex-col rounded-lg items-center justify-between">
          {categories ? (
            categories?.map((category: any, index: number) => (
              <div key={index} className="flex flex-col w-full mb-28">
                <div className="text-center mb-6">
                  <div className="font-bold text-[24px]">
                    {category.category.toUpperCase()}
                  </div>
                  <Link
                    href={`/categories/${URLGenerator(category.category)}`}
                    className="text-gray-600 text-[16px] hover:underline decoration-1 underline-offset-2"
                  >
                    {"View More >>"}
                  </Link>
                </div>
                <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 border-b py-10">
                  {productsByCategory &&
                    productsByCategory
                      ?.filter(
                        (products: any) =>
                          products.category_id === category.category_id
                      )
                      .slice(0, 4)
                      .map((products: any, index: number) => (
                        <div key={index} className={`w-full h-full`}>
                          <ProductCard
                            imageUrl={products.imageUrl}
                            product_id={products.product_id}
                            product_name={products.product_name}
                            dimensions={products.dimensions}
                          />
                        </div>
                      ))}
                  {productsByCategory &&
                    productsByCategory?.filter(
                      (product: any) =>
                        product.category_id === category.category_id
                    ).length == 0 && (
                      <div className="w-full flex justify-center items-center col-span-4 h-[100px]">
                        No product available.
                      </div>
                    )}
                </div>
              </div>
            ))
          ) : (
            <>{renderItems}</>
          )}
        </div>
      </div>
    </div>
  );
}
