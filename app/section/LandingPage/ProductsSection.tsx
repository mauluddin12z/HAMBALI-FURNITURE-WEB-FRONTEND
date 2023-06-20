"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image, { ImageLoader } from "next/image";
import useSWR from "swr";
import Link from "next/link";
import Modal from "@/app/components/Modal";
import URLGenerator from "@/app/utils/URLGenerator";
import { FormatRupiah } from "@arismun/format-rupiah";
import ProductCard from "@/app/components/ProductCard";

const getProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products`
  );
  return res.data;
};

const getProductById = async (id: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products/${id}`
  );
  return res.data;
};

export default function ProductsSection() {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [productId, setProductId] = useState();
  const { data } = useSWR("products", getProducts);
  const limitedProducts = data?.slice(0, 6);

  const productById: any = useSWR(
    productId ? ["productById", productId] : null,
    () => productId && getProductById(productId)
  );

  const [showModal, setShowModal] = useState(false);

  const renderItems = [];

  for (let i = 0; i < 6; i++) {
    renderItems.push(
      <div
        key={i}
        className="h-[400px] w-full border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col w-full h-[400px] justify-center items-center p-3">
          <div className="w-full h-full aspect-square bg-primary-color/20 rounded-lg animate-pulse"></div>
          <div className="w-full h-[10%] bg-primary-color/20 rounded-lg mt-10 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:max-w-7xl md:max-w-6xl min-h-[400px] mx-auto lg:px-0 px-8">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">Products</div>
          <Link
            href={"/products"}
            className="font-semibold text-[18px] hover:underline decoration-2 underline-offset-2"
          >
            View All
          </Link>
        </div>
        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-8 lg:px-8 px-0">
          {limitedProducts
            ? limitedProducts?.map((products: any, index: number) => (
                <ProductCard
                  key={index}
                  imageUrl={products.imageUrl}
                  product_id={products.product_id}
                  product_name={products.product_name}
                />
              ))
            : renderItems}
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex lg:flex-row flex-col justify-center items-center lg:p-10 p-2">
          <div className="lg:w-[50%] flex justify-center items-center drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)]">
            {productById.data?.imageUrl ? (
              <Image
                className="object-contain h-full rounded-t-lg transition-all -mt-16 -ml-10"
                src={productById.data?.imageUrl}
                loader={myLoader}
                width={500}
                height={500}
                alt={productById.data?.product_name}
              />
            ) : (
              <div>No image available</div>
            )}
          </div>
          <div className="flex flex-col flex-grow">
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
            {productById.data?.Category.category ? (
              <>
                <div className="font-bold lg:text-[18px] text-[14px]">
                  Kategori:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {productById.data?.Category.category}
                </div>
                <div className="w-full h-[1px] bg-black mb-3"></div>
              </>
            ) : null}
            {productById.data?.description ? (
              <>
                <div className="font-bold lg:text-[18px] text-[14px]">
                  Deskripsi:
                </div>
                <div className="text-gray-600 lg:text-[16px] text-[14px]">
                  {productById.data?.description}
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
              href={`/products/${URLGenerator(productById.data?.product_name)}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
            >
              See details
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
