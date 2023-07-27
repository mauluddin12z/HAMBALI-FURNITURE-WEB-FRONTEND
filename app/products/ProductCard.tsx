"use client";
import React, { useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "../utils/URLGenerator";
import Modal from "../components/Modal";
import useSWR from "swr";
import axios from "axios";
import { FormatRupiah } from "@arismun/format-rupiah";
import SkeletonLoading from "../components/SkeletonLoading";

const getProductById = async (id: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products/${id}`
  );
  return res.data;
};
export default function ProductCard({ data }: any) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [productId, setProductId] = useState(data?.product_id);

  const { data: productById } = useSWR(
    productId ? ["productById", productId] : null,
    () => productId && getProductById(productId)
  );

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={`lg:hover:border-primary-color/60 border-[1px] border-gray-200 lg:hover:scale-[103%] transition-transform ${
          showModal &&
          "border-primary-color/60 lg:scale-[103%] ring-3 ring-blue-200"
        } shadow overflow-hidden rounded-lg`}
      >
        <div className="flex flex-col h-[350px]">
          <div className="relative flex-grow h-[80%]">
            <div className="absolute w-full h-full flex justify-center items-center p-3">
              <div className="w-full h-full rounded-lg"></div>
            </div>
            <div className="flex-grow flex justify-center relative h-full bg-secondary-color">
              <div
                className="drop-shadow-[0px_0px_5px_rgba(0,0,5,0.5)] hover:drop-shadow-[0px_0px_5px_rgba(0,0,5,1)] transition-shadow cursor-pointer overflow-hidden z-20 flex justify-center items-center"
                onClick={() => {
                  setShowModal(true);
                  setProductId(data?.product_id);
                }}
              >
                <Image
                  className={`object-contain h-full rounded-t-lg scale-[110%] hover:scale-[115%] ${
                    showModal && "scale-[115%]"
                  } transition-transform duration-400`}
                  loader={myLoader}
                  src={data?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.product_name}
                  priority
                />
              </div>
            </div>
          </div>
          <div className="px-5 h-[20%] flex justify-center items-center z-20">
            <Link
              href={`/products/${URLGenerator(data?.product_name)}`}
              className="text-[16px] font-semibold tracking-tight text-gray-900 text-center hover:underline decoration-2 underline-offset-4"
            >
              {data?.product_name}
            </Link>
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col lg:flex-row flex-grow justify-center items-center lg:p-10 p-2 z-[50]">
          {productById ? (
            <>
              <div className="lg:w-[50%] h-full flex justify-center items-center drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)]">
                {productById?.imageUrl ? (
                  <Image
                    className="object-cover h-full w-full rounded-t-lg transition-all lg:-ml-10"
                    src={productById?.imageUrl}
                    loader={myLoader}
                    width={500}
                    height={500}
                    alt={productById?.product_name}
                    priority
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>
              <div className="flex flex-col lg:w-[50%] w-full">
                {productById?.product_name ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Nama Produk:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById?.product_name}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById?.category?.category ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Kategori:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById?.category.category}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById?.dimensions ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Dimensi:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById?.dimensions}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById?.material ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Material:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById?.material}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById?.color ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Warna:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {productById?.color}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                {productById?.price ? (
                  <>
                    <div className="font-bold lg:text-[18px] text-[14px]">
                      Harga:
                    </div>
                    <div className="text-gray-600 lg:text-[16px] text-[14px]">
                      {<FormatRupiah value={productById?.price} />}
                    </div>
                    <div className="w-full h-[1px] bg-black mb-3"></div>
                  </>
                ) : null}
                <Link
                  href={`/products/${URLGenerator(productById?.product_name)}`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
                >
                  See details
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-[400px] pr-4">
                <SkeletonLoading />
              </div>
              <div className="w-full flex flex-col gap-4 h-[400px]">
                <div className="w-full h-6">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-6">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-6">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-6">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-6">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-6">
                  <SkeletonLoading />
                </div>
                <div className="w-full h-6">
                  <SkeletonLoading />
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
