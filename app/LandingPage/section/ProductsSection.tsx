"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";
import ProductCard from "@/app/products/ProductCard";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import { useInView } from "react-intersection-observer";

const getProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products`
  );
  return res.data;
};

export default function ProductsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const { data: products } = useSWR("products", getProducts);
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
    <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-[400px] mx-auto lg:px-0 px-2">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full mb-8 overflow-hidden lg:overflow-visible">
          <div
            ref={ref}
            className={`font-semibold lg:text-[32px] text-[28px] transition-all duration-1000 ${
              inView ? "opacity-100" : "translate-x-[-100%] opacity-0"
            }`}
          >
            Products
          </div>
          <Link
            href={"/products"}
            ref={ref}
            className={`font-semibold text-[18px] hover:underline decoration-2 underline-offset-2 transition-all duration-1000 ${
              inView ? "opacity-100" : "translate-x-[100%] opacity-0"
            }`}
          >
            View All
          </Link>
        </div>
        <div
          className={`w-full grid lg:grid-cols-4 grid-cols-1 gap-8 transition-all duration-1000 ${
            inView ? "opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
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
