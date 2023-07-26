"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import Image, { ImageLoader } from "next/image";
import { FormatRupiah } from "@arismun/format-rupiah";
import Link from "next/link";
import URLGenerator from "@/app/utils/URLGenerator";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import RelatedProducts from "./relatedProducts";

const getProductByName = async (productNameQuery: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}productByName?productNameQuery=${productNameQuery}`;

  const res = await axios.get(url);
  return res.data;
};

export default function Page({ params }: { params: { slug: string } }) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const [productNameQuery, setProductNameQuery] = useState(
    URLToStringGenerator(params.slug)
  );
  const { data: productByName }: any = useSWR(
    productNameQuery ? ["productByName", productNameQuery] : null,
    () => productNameQuery && getProductByName(productNameQuery)
  );

  const [categoryQuery, setCategoryQuery] = useState();

  useEffect(() => {
    if (productByName && productByName.category_id) {
      setCategoryQuery(productByName.category_id);
    }
  }, [productByName]);


  return (
    <div className="max-w-7xl min-h-screen mx-auto lg:px-0 px-2 mt-44">
      <div className="flex flex-col w-full">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color/60 rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <Link
            href={"/products"}
            className="text-black hover:text-primary-color"
          >
            Products
          </Link>
          <div className="text-black">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">{productByName?.product_name}</div>
        </div>
        <div className="flex lg:flex-row flex-col mb-16">
          {productByName ? (
            <>
              {productByName?.product_name ? (
                <>
                  <div className="block lg:hidden font-bold text-[28px]">
                    {productByName?.product_name}
                  </div>
                </>
              ) : null}

              {/* Mobile */}
              {productByName?.category.category ? (
                <div className="block lg:hidden text-[16px] font-medium mb-6">
                  <Link
                    href={`/categories/${URLGenerator(
                      productByName?.category.category
                    )}`}
                  >
                    {productByName.category.category.toUpperCase()}
                  </Link>
                </div>
              ) : null}

              <div className="relative overflow-hidden lg:w-[350px] w-full flex rounded-lg mr-14 mb-6 bg-secondary-color flex-shrink-0 justify-center items-center">
                <Image
                  loader={myLoader}
                  src={productByName?.imageUrl}
                  width={500}
                  height={500}
                  alt={productByName?.product_name}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col flex-grow">
                {productByName?.product_name ? (
                  <>
                    <div className="lg:block hidden font-bold lg:text-[24px] text-[14px]">
                      {productByName?.product_name}
                    </div>
                  </>
                ) : null}
                {productByName?.category.category ? (
                  <div className="lg:block hidden text-[16px] font-medium mb-6">
                    <Link
                      href={`/categories/${URLGenerator(
                        productByName?.category.category
                      )}`}
                    >
                      {productByName.category.category.toUpperCase()}
                    </Link>
                  </div>
                ) : null}
                {productByName?.description ? (
                  <div className="mb-3">
                    <div className="text-justify text-gray-600 text-[14px]">
                      {productByName.description}
                    </div>
                  </div>
                ) : null}
                {productByName?.dimensions ? (
                  <div className="mb-3">
                    <span className="font-bold">Dimensi:</span>
                    <span> {productByName.dimensions}</span>
                  </div>
                ) : null}
                {productByName?.material ? (
                  <div className="mb-3">
                    <span className="font-bold">Material:</span>
                    <span> {productByName.material}</span>
                  </div>
                ) : null}
                {productByName?.color ? (
                  <div className="mb-3">
                    <span className="font-bold">Warna:</span>
                    <span> {productByName.color}</span>
                  </div>
                ) : null}
                {productByName?.price ? (
                  <div className="mb-3">
                    <span className="font-bold">Harga:</span>
                    <span>
                      {" "}
                      {<FormatRupiah value={productByName?.price} />}
                    </span>
                  </div>
                ) : null}
                <div className="mt-6">
                  <Link
                    href={"https://wa.me/6281369982678"}
                    target="_blank"
                    className="px-10 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-[80%] h-8 rounded-lg mb-2 lg:hidden block">
                <SkeletonLoading />
              </div>
              <div className="w-[30%] h-4 rounded-lg mb-2 lg:hidden block">
                <SkeletonLoading />
              </div>
              <div className="lg:w-[40%] w-full h-[500px] rounded-lg mr-14 mb-6 lg:block hidden">
                <SkeletonLoading />
              </div>
              <div className="flex flex-col gap-4 flex-grow w-full">
                <div className="w-full h-8 rounded-lg hidden lg:block">
                  <SkeletonLoading />
                </div>
                <div className="w-[300px] h-5 rounded-lg hidden lg:block">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-[200px] rounded-lg">
                  <SkeletonLoading />
                </div>
                <div className="w-[300px] h-5 rounded-lg">
                  <SkeletonLoading />
                </div>
                <div className="w-[300px] h-5 rounded-lg">
                  <SkeletonLoading />
                </div>
                <div className="w-[300px] h-5 rounded-lg">
                  <SkeletonLoading />
                </div>
                <div className="w-[300px] h-5 rounded-lg">
                  <SkeletonLoading />
                </div>
                <div className="w-[40%] h-10 rounded-full">
                  <SkeletonLoading />
                </div>
              </div>
            </>
          )}
        </div>
        <RelatedProducts
          categoryQuery={categoryQuery}
          productNameQuery={productNameQuery}
        />
      </div>
    </div>
  );
}
