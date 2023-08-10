"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/app/products/ProductCard";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import { useInView } from "react-intersection-observer";
import useProductsData from "@/app/utils/useProductsData";

export default function ProductsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const { products } = useProductsData();
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    if (mediaQuery.matches) {
      setLimit(4);
    } else {
      setLimit(8);
    }
  }, []);

  const limitedProducts = products?.slice(0, limit);
  const renderItems = [];

  for (let i = 0; i < limit; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[400px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-[400px] justify-center items-center p-3">
          <div className="w-full h-full aspect-square">
            <SkeletonLoading />
          </div>
          <div className="w-full h-[10%] rounded-lg mt-4">
            <SkeletonLoading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-[400px] mx-auto xl:px-4 px-2"
    >
      <div
        className={`flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          inView ? "section-transition-on" : "section-transition-off"
        }`}
      >
        <div className="flex justify-between items-center w-full mb-8 overflow-hidden 2xl:overflow-visible">
          <div className={`font-semibold lg:text-[32px] text-[28px]`}>
            Products
          </div>
          <Link
            href={"/products"}
            className={`font-semibold text-[18px] hover:underline decoration-2 underline-offset-2`}
          >
            View All
          </Link>
        </div>
        <div className={`w-full grid lg:grid-cols-4 grid-cols-1 gap-8`}>
          {limitedProducts ? (
            limitedProducts?.map((products: any, index: number) => (
              <ProductCard key={index} data={products} />
            ))
          ) : (
            <>{renderItems}</>
          )}
        </div>
      </div>
    </div>
  );
}
