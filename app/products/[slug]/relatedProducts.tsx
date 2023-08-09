"use client";
import React, { useEffect, useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import URLGenerator from "@/app/utils/URLGenerator";
import useRelatedProductsData from "@/app/utils/useRelatedProductsData";

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

  const { relatedProducts } = useRelatedProductsData(
    categoryQuery,
    productNameQuery
  );

  const [visibleRelatedItem, setvisibleRelatedItem] = useState(5);
  const relatedProductSliced = relatedProducts?.slice(0, visibleRelatedItem);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setvisibleRelatedItem(4);
    } else {
      setvisibleRelatedItem(5);
    }
  }, []);
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
      <div className="grid gap-2 grid-cols-2 lg:grid-cols-5">
        {relatedProductSliced
          ? relatedProductSliced?.map((product: any, index: number) => (
              <Link href={URLGenerator(product?.product_name)} key={index}>
                <div className="flex flex-col justify-center items-center h-[300px] relative rounded-lg overflow-hidden border shadow">
                  <div className="drop-shadow-[0px_0px_5px_rgba(0,0,0,0.2)] hover:drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)] transition-all cursor-pointer w-full h-full">
                    <Image
                      className={`object-contain w-full h-full rounded-t-lg transition-all duration-300 ${
                        cardIsHovered === index ? "scale-100" : "scale-75 "
                      } transition-all`}
                      loader={myLoader}
                      src={product.imageUrl}
                      width={500}
                      height={500}
                      alt={product.category}
                    />
                  </div>
                  <div
                    className={`absolute bottom-[-40px] flex justify-center items-center w-[80%] h-10 transition-all duration-200 hover:bg-white/20 ${
                      cardIsHovered === index
                        ? "border-[2px] border-white bottom-[50%] translate-y-[50%]"
                        : ""
                    } transition- z-20`}
                    onMouseEnter={() => handleOutsideLayerHover(index)}
                    onMouseLeave={handleOutsideLayerLeave}
                  >
                    <div
                      className={`text-[16px] tracking-tight text-white hover:text-blue text-center z-30 flex justify-center items-center opacity-0 transition-all duration-200 ${
                        cardIsHovered === index ? "opacity-100" : ""
                      }`}
                    >
                      View More
                    </div>
                  </div>
                  <div
                    className={`absolute w-full h-full z-10 transition-all duration-200 ${
                      cardIsHovered === index
                        ? "bg-black/80 backdrop-blur-sm"
                        : ""
                    }`}
                    onMouseEnter={() => handleOutsideLayerHover(index)}
                    onMouseLeave={handleOutsideLayerLeave}
                  ></div>
                </div>
              </Link>
            ))
          : renderItems}
      </div>
    </div>
  );
}
