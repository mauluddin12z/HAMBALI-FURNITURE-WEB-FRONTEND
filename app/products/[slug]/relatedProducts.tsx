"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import URLGenerator from "@/app/utils/URLGenerator";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const getRelatedProduct = async (
  categoryQuery: string,
  productNameQuery: string
) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}relatedProducts?categoryQuery=${categoryQuery}&productNameQuery=${productNameQuery}`;

  const res = await axios.get(url);
  return res.data;
};

export default function OtherBlogs({ categoryQuery, productNameQuery }: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [cardIsHovered, setCardIsHovered] = useState(-1);

  const handleOutsideLayerHover = (index: number) => {
    setCardIsHovered(index);
  };

  const handleOutsideLayerLeave = () => {
    setCardIsHovered(-1);
  };

  const { data: relatedProduct }: any = useSWR(
    categoryQuery ? ["relatedProduct", categoryQuery, productNameQuery] : null,
    () => categoryQuery && getRelatedProduct(categoryQuery, productNameQuery)
  );

  const [visibleRelatedItem, setvisibleRelatedItem] = useState(4);
  const relatedProductSliced = relatedProduct?.slice(0, visibleRelatedItem);

  const renderItems = [];

  for (let i = 0; i < visibleRelatedItem; i++) {
    renderItems.push(
      <div
        key={i}
        className="w-full h-full border border-gray-200 rounded-lg shadow"
      >
        <div className="w-full h-full flex justify-center items-center p-3">
          <div className="w-full h-full aspect-square rounded-lg">
            <SkeletonLoading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-col">
      <div className="font-semibold text-[26px] mb-10">Related Product</div>
      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
        {relatedProductSliced
          ? relatedProductSliced?.map((product: any, index: number) => (
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
                  className={`object-contain transition-all duration-300 ${
                    cardIsHovered === index ? `scale-110` : ""
                  }`}
                  alt={product.product_name}
                />
                <div
                  className="absolute w-full h-full hover:bg-black/50 z-10 transition-all"
                  onMouseEnter={() => handleOutsideLayerHover(index)}
                  onMouseLeave={handleOutsideLayerLeave}
                ></div>
              </Link>
            ))
          : renderItems}
      </div>
    </div>
  );
}
