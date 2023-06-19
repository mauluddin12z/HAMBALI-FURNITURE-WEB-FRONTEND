import React from "react";

export default function Pagination({
  currentPage,
  pageNumbers,
  setStart,
  limit,
}: any) {
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
            onClick={() => setStart((prev: any) => prev - limit)}
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
              onClick={() => setStart(page * limit - limit)}
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
            onClick={() => setStart((prev: any) => prev + limit)}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
}
