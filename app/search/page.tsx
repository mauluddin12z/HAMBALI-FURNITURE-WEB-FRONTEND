"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProductSearchResults from "./ProductSearchResults";

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  return (
    <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-[500px] mx-auto lg:px-0 px-4 mt-44">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color/60 rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">
            Search Results For &quot;{searchQuery}&quot;
          </div>
        </div>
        <div className="text-[24px] font-medium text-center mb-10">
          Search Results For &quot;{searchQuery}&quot;
        </div>
        <ProductSearchResults generalSearchQuery={searchQuery} />
      </div>
    </div>
  );
}
