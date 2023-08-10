import React, { useEffect, useRef, useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import { FormatRupiah } from "@arismun/format-rupiah";
import Pagination from "@/app/components/Pagination";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import ImageModal from "@/app/components/ImageModal";
import DropdownFilter from "./DropdownFilter";
import useAuth from "@/app/utils/useAuth";
import Modal from "@/app/components/Modal";
import LoadingForButton from "@/app/components/LoadingForButton";
import Alerts from "@/app/components/alerts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useFilteredProductsData from "@/app/utils/useFilteredProductsData";
import URLGenerator from "@/app/utils/URLGenerator";
import useProductByIdData from "@/app/utils/useProductByIdData";
import { mutate } from "swr";

export default function ProductTable() {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const { axiosJWT, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    textColor: "",
    bgColor: "",
    bgColorHover: "",
  });

  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(6);
  const [categoryQuery, setCategoryQuery] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isZoom, setIsZoom] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);

  const [productId, setProductId] = useState(0);

  const [filter, setFilter] = useState({});
  useEffect(() => {
    setFilter({
      start: start,
      limit: limit,
      categoryQuery: categoryQuery,
      searchQuery: searchQuery,
      revalidate: true,
    });
  }, [start, limit, categoryQuery, searchQuery]);

  const { filteredProducts, totalFilteredProducts } =
    useFilteredProductsData(filter);

  const { productById } = useProductByIdData(productId);
  const alertTimeoutRef = useRef<any>(null);
  const handleDelete = async (selectedId: number) => {
    setIsLoading(true);
    try {
      const { data } = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalDeleteOpen(false);
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
      setShowAlert(false);
      setTimeout(() => {
        setAlert({
          message: data.msg,
          textColor: "text-white",
          bgColor: "bg-green-700",
          bgColorHover: "hover:bg-green-800",
        });
        setShowAlert(true);
      }, 100);
      alertTimeoutRef.current = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setIsLoading(false);
      window.scrollTo(0, 0);
      mutate("products");
    } catch (error: any) {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
      setShowAlert(false);
      setTimeout(() => {
        setAlert({
          message: error.response
            ? error.response.data.msg
            : "Error deleting data, please try again later.",
          textColor: "text-white",
          bgColor: "bg-red-700",
          bgColorHover: "hover:bg-red-800",
        });
        setShowAlert(true);
      }, 100);

      alertTimeoutRef.current = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    setIsLoading(false);
  };

  const handleSearch = async (e: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    setSearchQuery(e.target.value);
    setStart(0);
  };

  const renderItems = [];
  for (let i = 0; i < limit; i++) {
    renderItems.push(
      <tr
        key={i}
        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
      >
        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          <div className="w-full h-full">
            <SkeletonLoading />
          </div>
        </th>
        <td className="px-6 py-4">
          <div className="w-full h-full">
            <SkeletonLoading />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="w-[200px] h-[200px]">
            <SkeletonLoading />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-col w-[250px] gap-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-[10px]">
                <SkeletonLoading />
              </div>
            ))}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="w-full h-full">
            <SkeletonLoading />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="w-full h-full">
            <SkeletonLoading />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="w-full h-full">
            <SkeletonLoading />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="w-full h-full">
            <SkeletonLoading />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-wrap justify-center gap-x-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              disabled
            >
              Edit
            </button>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              disabled
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  }
  return (
    <div className="relative">
      <div className="w-full py-4 mb-4">
        <Alerts
          showAlert={showAlert}
          message={alert.message}
          textColor={alert.textColor}
          bgColor={alert.bgColor}
          bgColorHover={alert.bgColorHover}
        />
      </div>
      <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-y-2 pb-4 mb-10">
        <DropdownFilter
          categoryQuery={categoryQuery}
          setCategoryQuery={setCategoryQuery}
          setStart={setStart}
          setSearchQuery={setSearchQuery}
        />
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg lg:w-80 w-full bg-gray-50 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            placeholder="Search for items"
            value={searchQuery}
            onChange={(e: any) => {
              handleSearch(e);
            }}
          />
        </div>
      </div>
      <div className="mb-10 overflow-x-auto rounded border">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b bg-neutral-100 font-medium">
            <tr>
              <th className="px-6 py-6 text-center w-[15%]">Product name</th>
              <th className="px-6 py-6 text-center">Category</th>
              <th className="px-6 py-6 text-center">Image</th>
              <th className="px-6 py-6 text-center">Description</th>
              <th className="px-6 py-6 text-center">Price</th>
              <th className="px-6 py-6 text-center">Dimensions</th>
              <th className="px-6 py-6 text-center">Material</th>
              <th className="px-6 py-6 text-center">Colors</th>
              <th className="px-6 py-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts ? (
              filteredProducts?.map((products: any, index: number) => (
                <tr
                  key={index}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/products/${URLGenerator(products.product_name)}`}
                      className="hover:underline font-semibold text-gray-900"
                    >
                      {products.product_name ? products.product_name : "-"}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {products.category.category
                      ? products.category.category
                      : "-"}
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    {products.imageUrl ? (
                      <div
                        onClick={() => {
                          setShowModalImage(true);
                          setProductId(products?.product_id);
                        }}
                        className="w-[200px] aspect-square overflow-hidden cursor-pointer hover:opacity-90"
                      >
                        <Image
                          className="object-contain h-full"
                          loader={myLoader}
                          src={products?.imageUrl}
                          width={500}
                          height={500}
                          alt={products?.product_name}
                          priority
                        />
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="description truncate line-clamp-[6] whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: products.description
                          ? products.description
                          : "-",
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {products?.price && products?.price > 0 ? (
                      <FormatRupiah value={products?.price} />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {products.dimensions ? products.dimensions : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {products.material ? products.material : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {products.color ? products.color : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          router.push(
                            "/administrator/products/edit/" +
                              products.product_id
                          )
                        }
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={() => {
                          setSelectedId(products.product_id);
                          setIsModalDeleteOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <>{renderItems}</>
            )}
          </tbody>
        </table>
        {filteredProducts?.length == 0 && (
          <div className="w-full h-[500px] flex justify-center items-center">
            No product available.
          </div>
        )}
      </div>
      <Pagination
        totalData={totalFilteredProducts}
        start={start}
        setStart={setStart}
        limit={limit}
      />
      <ImageModal
        setIsVisible={setShowModalImage}
        isVisible={showModalImage}
        onClose={() => setShowModalImage(false)}
        setIsZoom={setIsZoom}
      >
        <div className="h-[80%] w-[80%] flex justify-center items-center">
          {productById && (
            <div className="flex flex-col h-full w-full justify-center items-center">
              <Image
                className={`object-contain w-auto h-full z-20 transition-transform duration-200 ${
                  isZoom
                    ? "scale-150 cursor-zoom-out"
                    : "scale-100 cursor-zoom-in"
                }`}
                loader={myLoader}
                src={productById?.imageUrl}
                width={500}
                height={500}
                alt={"productImage" + productById?.product_id}
                priority
                onClick={() => setIsZoom((prev) => !prev)}
              />
            </div>
          )}
        </div>
      </ImageModal>

      {/* Modal Delete Validation */}
      <Modal
        isVisible={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <div className="flex flex-col min-w-[100px] min-h-[100px] w-full h-[300px]">
          <div className="h-full flex justify-center items-center lg:text-[16px] text-[12px]">
            Are you sure you want to delete this data ?
          </div>
          <div className=" w-full border-t flex justify-end border-accent-1 pt-4 px-2">
            <button
              onClick={() => setIsModalDeleteOpen(false)}
              className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Close
            </button>
            <button
              disabled={isLoading}
              onClick={() => {
                handleDelete(selectedId || 0);
              }}
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              {isLoading ? (
                <div className="gap-x-2 flex justify-center">
                  <LoadingForButton />
                  Loading...
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
