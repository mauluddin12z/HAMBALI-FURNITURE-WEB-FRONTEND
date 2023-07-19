"use client";
import React, { useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";

export default function ProductSearchResultsCard({
  imageUrl,
  product_name,
  description,
  category,
}: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  return (
    <>
      <div className="border lg:p-10 p-4 rounded-lg flex lg:flex-row flex-col">
        <div className="lg:w-[22%] w-full border rounded-lg">
          <Image
            loader={myLoader}
            src={imageUrl}
            alt="ProductImage"
            priority
            width={400}
            height={400}
          />
        </div>
        <div className="w-full lg:ml-10 py-2">
          <div className="flex flex-col">
            <Link
              href={`/products/${URLGenerator(product_name)}`}
              className="text-[22px] font-semibold tracking-tight text-gray-900 hover:underline decoration-2 underline-offset-4 mb-1"
            >
              {product_name}
            </Link>
            <Link
              href={`/categories/${URLGenerator(category)}`}
              className="text-gray-400 text-[14px] hover:underline decoration-1 underline-offset-2 mb-6"
            >
              {category}
            </Link>
            <div className="mb-4 text-justify text-[14px] lg:text-[16px]">
              {description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
