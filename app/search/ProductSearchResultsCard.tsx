"use client";
import React, { useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import { FormatRupiah } from "@arismun/format-rupiah";

export default function ProductSearchResultsCard({
  imageUrl,
  product_name,
  description,
  category,
  dimensions,
  material,
  color,
  price,
}: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  return (
    <>
      <div className="border p-4 rounded-lg flex lg:flex-row flex-col">
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
        <div className="lg:w-[78%] w-full lg:ml-10 py-2">
          <div className="flex flex-col flex-grow lg:w-auto w-full h-full">
            {product_name ? (
              <div className="flex">
                <div className="font-semibold lg:text-[16px] text-[14px] mr-2">
                  Nama Produk:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {product_name}
                </div>
              </div>
            ) : null}
            {category ? (
              <div className="flex">
                <div className="font-semibold lg:text-[16px] text-[14px] mr-2">
                  Kategori:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {category}
                </div>
              </div>
            ) : null}
            {dimensions ? (
              <div className="flex">
                <div className="font-semibold lg:text-[16px] text-[14px] mr-2">
                  Dimensi:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {dimensions}
                </div>
              </div>
            ) : null}
            {material ? (
              <div className="flex">
                <div className="font-semibold lg:text-[16px] text-[14px] mr-2">
                  Material:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {material}
                </div>
              </div>
            ) : null}
            {color ? (
              <div className="flex">
                <div className="font-semibold lg:text-[16px] text-[14px] mr-2">
                  Warna:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {color}
                </div>
              </div>
            ) : null}
            {price ? (
              <div className="flex">
                <div className="font-semibold lg:text-[16px] text-[14px] mr-2">
                  Harga:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {<FormatRupiah value={price} />}
                </div>
              </div>
            ) : null}
            {description ? (
              <div className="flex flex-col">
                <div className="font-semibold lg:text-[16px] text-[14px] mr-2">
                  Description:
                </div>
                <div
                  className="text-[14px] text-gray-600 text-justify truncate line-clamp-[8] whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            ) : null}
            <div className="mt-4">
              <Link
                href={`/products/${URLGenerator(product_name)}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
              >
                See details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
