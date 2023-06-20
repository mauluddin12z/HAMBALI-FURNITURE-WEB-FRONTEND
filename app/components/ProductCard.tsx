"use client";
import React, { useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import Modal from "./Modal";
import useSWR from "swr";
import axios from "axios";
import { FormatRupiah } from "@arismun/format-rupiah";

const getProductById = async (id: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products/${id}`
  );
  return res.data;
};
export default function ProductCard({
  imageUrl,
  product_name,
  product_id,
}: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [productId, setProductId] = useState(product_id);

  const productById: any = useSWR(
    productId ? ["productById", productId] : null,
    () => productId && getProductById(productId)
  );

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={`hover:border-primary-color/60 border-[1px] border-gray-200 hover:scale-[103%] transition-transform ${
          showModal &&
          "border-primary-color/60 scale-[103%] ring-3 ring-blue-200"
        } shadow overflow-hidden rounded-lg`}
      >
        <div className="flex flex-col h-[350px]">
          <div className="relative flex-grow h-[80%]">
            <div className="absolute w-full h-full flex justify-center items-center p-3">
              <div className="bg-secondary-color w-full h-full rounded-lg"></div>
            </div>
            <div
              className="relative flex-grow h-full drop-shadow-[0px_0px_5px_rgba(0,0,5,0.5)] hover:drop-shadow-[0px_0px_5px_rgba(0,0,5,1)] transition-shadow cursor-pointer overflow-hidden z-20 flex justify-center items-center"
              onClick={() => {
                setShowModal(true);
                setProductId(product_id);
              }}
            >
              <Image
                className={`object-contain h-full rounded-t-lg scale-[110%] hover:scale-[115%] ${
                  showModal && "scale-[115%]"
                } transition-transform duration-400`}
                loader={myLoader}
                src={imageUrl}
                width={500}
                height={500}
                alt={product_name}
              />
            </div>
          </div>
          <div className="px-5 h-[20%] flex justify-center items-center z-20">
            <Link
              href={`/products/${URLGenerator(product_name)}`}
              className="text-[16px] font-semibold tracking-tight text-gray-900 text-center hover:underline decoration-2 underline-offset-4"
            >
              {product_name}
            </Link>
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex lg:flex-row flex-col justify-center items-center lg:p-10 p-2 z-[50]">
          {productById ? (
            <>
              <div className="lg:w-[50%] flex justify-center items-center drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)] overflow-hidden">
                {productById.data?.imageUrl ? (
                  <Image
                    className="object-contain h-full rounded-t-lg transition-all -mt-16 lg:-ml-10"
                    src={productById.data?.imageUrl}
                    loader={myLoader}
                    width={500}
                    height={500}
                    alt={productById.data?.product_name}
                    priority
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>
              <div className="flex flex-col flex-grow lg:w-auto w-full">
                {productById.data?.product_name ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Nama Produk:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById.data?.product_name}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById.data?.category.category ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Kategori:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById.data?.category.category}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById.data?.dimensions ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Dimensi:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById.data?.dimensions}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById.data?.material ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Material:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById.data?.material}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById.data?.color ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Warna:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById.data?.color}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById.data?.price ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Harga:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {<FormatRupiah value={productById.data?.price} />}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                <Link
                  href={`/products/${URLGenerator(
                    productById.data?.product_name
                  )}`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
                >
                  See details
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-[80%] h-8 bg-secondary-color rounded-lg animate-pulse mb-2 lg:hidden block"></div>
              <div className="w-[30%] h-4 bg-secondary-color rounded-lg animate-pulse mb-2 lg:hidden block"></div>
              <div className="relative overflow-hidden lg:w-[40%] w-full aspect-square flex bg-secondary-color rounded-lg animate-pulse mr-14 mb-6 border"></div>
              <div className="flex flex-col gap-4 flex-grow">
                <div className="w-[200px] h-8 bg-secondary-color rounded-lg animate-pulse hidden lg:block"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse hidden lg:block"></div>
                <div className="w-full h-[200px] bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-[300px] h-5 bg-secondary-color rounded-lg animate-pulse"></div>
                <div className="w-full h-10 bg-secondary-color rounded-full animate-pulse"></div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
