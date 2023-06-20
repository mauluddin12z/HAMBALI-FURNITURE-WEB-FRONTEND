"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";

const getProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products`
  );
  return res.data;
};


export default function ProductsSection() {

  const { data } = useSWR("products", getProducts);
  const limitedProducts = data?.slice(0, 6);

  const renderItems = [];

  for (let i = 0; i < 6; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[400px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-[400px] justify-center items-center p-3">
          <div className="w-full h-full aspect-square bg-primary-color/20 rounded-lg animate-pulse"></div>
          <div className="w-full h-[10%] bg-primary-color/20 rounded-lg mt-4 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:max-w-7xl md:max-w-6xl min-h-[400px] mx-auto lg:px-0 px-4">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">Products</div>
          <Link
            href={"/products"}
            className="font-semibold text-[18px] hover:underline decoration-2 underline-offset-2"
          >
            View All
          </Link>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-8">
          {limitedProducts
            ? limitedProducts?.map((products: any, index: number) => (
                <ProductCard
                  key={index}
                  imageUrl={products.imageUrl}
                  product_id={products.product_id}
                  product_name={products.product_name}
                />
              ))
            : renderItems}
        </div>
      </div>
    </div>
  );
}