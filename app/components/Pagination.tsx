import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../Loading";

export default function Pagination({ totalData, start, setStart, limit }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageQuery = searchParams.get("page");
  const [dataLength, setDataLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = async (page: any) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    const newStart = (page - 1) * limit;
    router.push(pathname + "?" + createQueryString("page", page));
    setStart(newStart);

    setIsLoading(false);
  };

  useEffect(() => {
    if (totalData.data) {
      setDataLength(totalData.data.length);
    }
    setCurrentPage(pageQuery ? Number(pageQuery) : 1);
  }, [pageQuery, totalData.data, currentPage]);

  useEffect(() => {
    if (totalData.data) {
      setDataLength(totalData.data.length);
    }
    setStart(limit * (currentPage - 1));
  }, [totalData.data, setStart, limit, currentPage]);

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

  return (
    <div className="flex justify-center items-center gap-x-2">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            disabled={currentPage <= 1}
            className={`px-3 py-2 leading-tight bg-white border border-gray-300 rounded-l-lg ${
              currentPage <= 1
                ? "text-gray-400"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </li>
        {pageNumbers.map((page: any) => (
          <li key={page}>
            <button
              className={`${
                currentPage === page
                  ? "text-white border border-gray-300 bg-blue-500"
                  : `text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700`
              } px-3 py-2 leading-tight`}
              onClick={() => handlePageChange(page)}
              disabled={isLoading}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={currentPage >= Math.max(...pageNumbers)}
            className={`px-3 py-2 leading-tight bg-white border border-gray-300 rounded-r-lg ${
              currentPage >= Math.max(...pageNumbers)
                ? "text-gray-400"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </li>
      </ul>
      {isLoading && (
        <span>
          <Loading />
        </span>
      )}
    </div>
  );
}
