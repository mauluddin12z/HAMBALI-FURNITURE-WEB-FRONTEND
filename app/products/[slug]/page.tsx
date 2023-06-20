"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import Image, { ImageLoader } from "next/image";
import { FormatRupiah } from "@arismun/format-rupiah";
import Link from "next/link";
import URLGenerator from "@/app/utils/URLGenerator";

const getProductByName = async (productNameQuery: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}productByName?productNameQuery=${productNameQuery}`;

  const res = await axios.get(url);
  return res.data;
};

const getProductCategory = async (categoryQuery: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?categoryQuery=${categoryQuery}`;

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
  const { data }: any = useSWR(
    productNameQuery ? ["productByName", productNameQuery] : null,
    () => productNameQuery && getProductByName(productNameQuery)
  );

  const [categoryQuery, setCategoryQuery] = useState();
  const productByCategory: any = useSWR(
    categoryQuery ? ["productByCategory", categoryQuery] : null,
    () => categoryQuery && getProductCategory(categoryQuery)
  );

  const [visibleRelatedItem, setvisibleRelatedItem] = useState(4);
  const relatedProduct = productByCategory.data?.slice(0, visibleRelatedItem);

  useEffect(() => {
    if (data && data.category_id) {
      setCategoryQuery(data.category_id);
    }
  }, [data]);

  const renderItems = [];

  for (let i = 0; i < visibleRelatedItem; i++) {
    renderItems.push(
      <div
        key={i}
        className="w-full h-full border border-gray-200 rounded-lg shadow"
      >
        <div className="w-full h-full flex justify-center items-center p-3">
          <div className="w-full h-full aspect-square bg-primary-color/20 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-5xl min-h-screen mx-auto lg:px-0 px-4 mt-36">
      <div className="flex flex-col w-full">
        <div className="flex lg:flex-row flex-col mb-16">
          {data ? (
            <>
              {data?.product_name ? (
                <>
                  <div className="block lg:hidden font-bold text-[28px]">
                    {data?.product_name}
                  </div>
                </>
              ) : null}
              {data?.category.category ? (
                <div className="block lg:hidden text-[16px] font-semibold text-gray-400 mb-6">
                  <Link
                    href={`/categories/${URLGenerator(
                      data?.category.category
                    )}`}
                  >
                    {data.category.category}
                  </Link>
                </div>
              ) : null}
              <div className="relative overflow-hidden lg:w-[350px] w-full flex rounded-lg mr-14 mb-6 bg-secondary-color flex-shrink-0 justify-center items-center">
                <Image
                  loader={myLoader}
                  src={data?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.product_name}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col flex-grow">
                {data?.product_name ? (
                  <>
                    <div className="lg:block hidden font-bold lg:text-[24px] text-[14px]">
                      {data?.product_name}
                    </div>
                  </>
                ) : null}
                {data?.category.category ? (
                  <div className="lg:block hidden text-[16px] font-semibold text-gray-400 mb-6">
                    <Link
                      href={`/categories/${URLGenerator(
                        data?.category.category
                      )}`}
                    >
                      {data.category.category}
                    </Link>
                  </div>
                ) : null}
                {data?.description ? (
                  <div className="mb-3">
                    <div className="text-justify text-gray-600 text-[14px]">
                      {data.description}
                    </div>
                  </div>
                ) : null}
                {data?.dimensions ? (
                  <div className="mb-3">
                    <span className="font-bold">Dimensi:</span>
                    <span> {data.dimensions}</span>
                  </div>
                ) : null}
                {data?.material ? (
                  <div className="mb-3">
                    <span className="font-bold">Material:</span>
                    <span> {data.material}</span>
                  </div>
                ) : null}
                {data?.color ? (
                  <div className="mb-3">
                    <span className="font-bold">Warna:</span>
                    <span> {data.color}</span>
                  </div>
                ) : null}
                {data?.price ? (
                  <div className="mb-3">
                    <span className="font-bold">Harga:</span>
                    <span> {<FormatRupiah value={data?.price} />}</span>
                  </div>
                ) : null}
                <Link
                  href={"https://wa.me/6281369982678"}
                  target="_blank"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 mt-6 text-center"
                >
                  Contact Us
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-[80%] h-8 bg-secondary-color rounded-lg animate-pulse mb-2 lg:hidden block"></div>
              <div className="w-[30%] h-4 bg-secondary-color rounded-lg animate-pulse mb-2 lg:hidden block"></div>
              <div className="relative overflow-hidden lg:w-[35%] w-full aspect-square flex bg-secondary-color rounded-lg animate-pulse mr-14 mb-6"></div>
              <div className="flex flex-col gap-4 flex-grow">
                <div className="w-[200px] h-8 bg-secondary-color rounded-lg animate-pulse hidden lg:block"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse hidden lg:block"></div>
                <div className="w-full h-[200px] bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-full h-10 bg-secondary-color rounded-full animate-pulse"></div>
              </div>
            </>
          )}
        </div>
        <div className="flex-col">
          <div className="font-semibold text-[26px] mb-10">Related Product</div>
          <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
            {relatedProduct
              ? relatedProduct?.map((product: any, index: number) => (
                  <Link
                    href={URLGenerator(product?.product_name)}
                    key={index}
                    className="w-full h-[250px] border flex relative"
                  >
                    <Image
                      loader={myLoader}
                      src={product.imageUrl}
                      width={500}
                      height={500}
                      className="object-contain"
                      alt={product.product_name}
                    />
                    <div className="absolute w-full h-full hover:bg-black/50 z-10 transition-all"></div>
                  </Link>
                ))
              : renderItems}
          </div>
        </div>
      </div>
    </div>
  );
}
