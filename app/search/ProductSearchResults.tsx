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
  categoryQuery: number,
  searchQuery: string
) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}productSearchResults?start=${start}&limit=${limit}`;

  if (categoryQuery > 0) {
    url += `&categoryQuery=${categoryQuery}`;
  }
  if (searchQuery !== null) {
    url += `&searchQuery=${searchQuery}`;
  }

  const res = await axios.get(url);
  return res.data;
};

const getTotalProductSearchResults = async (
  categoryQuery: number,
  searchQuery: string
) => {
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
  const [categoryQuery, setCategoryQuery] = useState(-1);
  const [dataLength, setDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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

  const { data } = useSWR(
    ["productSearchResults", start, limit, categoryQuery, searchQuery],
    () => getProductSearchResults(start, limit, categoryQuery, searchQuery)
  );

  const totalProductSearchResults = useSWR(
    ["totalProductSearchResults", categoryQuery, searchQuery],
    () => getTotalProductSearchResults(categoryQuery, searchQuery)
  );

  const renderItems = [];

  useEffect(() => {
    if (totalProductSearchResults.data) {
      setDataLength(totalProductSearchResults.data.length);
    }
    setCurrentPage(Math.floor(start / limit) + 1);
  }, [totalProductSearchResults.data, start, limit, currentPage]);

  const totalPages = Math.ceil(dataLength / limit);

  const pageRange = 2;

  let startPage = Math.max(currentPage - pageRange, 1);
  let endPage = Math.min(currentPage + pageRange, totalPages);

  if (currentPage - pageRange <= 1) {
    endPage = Math.min(endPage + (pageRange - (currentPage - 1)), totalPages);
  }

  if (currentPage + pageRange >= totalPages) {
    startPage = Math.max(
      startPage - (pageRange - (totalPages - currentPage)),
      1
    );
  }

  let pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  for (let i = 0; i < limit; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[350px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-[350px] justify-center items-center p-3">
          <div className="w-full h-full aspect-square rounded-lg">
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
    <div className="flex w-full">
      <div className="w-full lg:min-h-[500px] min-h-[250px] flex flex-col rounded-lg items-center justify-between">
        {data?.length == 0 ? (
          <div className="w-full flex justify-center items-center h-full">
            No product available.
          </div>
        ) : (
          <div className="hidden"></div>
        )}
        <div className="w-full flex flex-col gap-y-4 mb-4">
          {data ? (
            data?.map((products: any, index: number) => (
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
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          setStart={setStart}
          limit={limit}
        />
      </div>
    </div>
  );
}
