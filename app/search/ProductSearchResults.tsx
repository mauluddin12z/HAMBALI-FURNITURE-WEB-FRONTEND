"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import ProductCard from "../products/ProductCard";
import Pagination from "../components/Pagination";
import Link from "next/link";
import SkeletonLoading from "../components/SkeletonLoading";
import ProductSearchResultsCard from "./ProductSearchResultsCard";

const getProductSearchResults = async (
  start: number,
  limit: number,
  searchQuery: string
) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}productSearchResults?start=${start}&limit=${limit}`;

  if (searchQuery !== null) {
    url += `&searchQuery=${searchQuery}`;
  }

  const res = await axios.get(url);
  return res.data;
};

const getTotalProductSearchResults = async (searchQuery: string) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}productSearchResults?`;

  if (searchQuery !== null) {
    url += `&searchQuery=${searchQuery}`;
  }

  const res = await axios.get(url);
  return res.data;
};

export default function ProductSearchResults(generalSearchQuery: any) {
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery(generalSearchQuery.generalSearchQuery);
  }, [generalSearchQuery]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setLimit(3);
    }
  }, []);

  const { data: productSearchResults } = useSWR(
    ["productSearchResults", start, limit, searchQuery],
    () => getProductSearchResults(start, limit, searchQuery)
  );

  const { data: totalProductSearchResults } = useSWR(
    ["totalProductSearchResults", searchQuery],
    () => getTotalProductSearchResults(searchQuery)
  );

  const renderItems = [];
  for (let i = 0; i < limit; i++) {
    renderItems.push(
      <div key={i}>
        <div className="border lg:p-10 p-4 rounded-lg flex lg:flex-row flex-col">
          <div className="lg:w-[22%] w-full rounded-lg h-[400px]">
            <SkeletonLoading />
          </div>
          <div className="w-full lg:ml-10 py-2 flex flex-col gap-4">
            <div className="w-[300px] h-8">
              <SkeletonLoading />
            </div>
            <div className="w-[100px] h-4">
              <SkeletonLoading />
            </div>
            <div className="w-full h-full">
              <SkeletonLoading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <div className="w-full lg:min-h-[500px] min-h-[250px] flex flex-col rounded-lg items-center justify-between">
        {productSearchResults?.length == 0 ? (
          <div className="w-full flex justify-center items-center h-full">
            No product available.
          </div>
        ) : (
          <div className="hidden"></div>
        )}
        <div className="w-full flex flex-col gap-y-4 mb-4">
          {productSearchResults ? (
            productSearchResults?.map((products: any, index: number) => (
              <ProductSearchResultsCard
                key={index}
                productId={products.product_id}
                imageUrl={products.imageUrl}
                product_name={products.product_name}
                description={products.description}
                category={products.category.category}
              />
            ))
          ) : (
            <>{renderItems}</>
          )}
        </div>
        <Pagination
          totalData={totalProductSearchResults}
          start={start}
          setStart={setStart}
          limit={limit}
        />
      </div>
    </div>
  );
}
