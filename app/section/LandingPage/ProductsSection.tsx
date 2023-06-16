"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image, { ImageLoader } from "next/image";
import useSWR from "swr";
import Link from "next/link";
import Modal from "@/app/components/Modal";
import URLGenerator from "@/app/utils/URLGenerator";
import { FormatRupiah } from "@arismun/format-rupiah";

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
  const productById: any = useSWR(
    productId ? ["productById", productId] : null,
    () => productId && getProductById(productId)
  );

  const limitedProducts = data?.slice(0, 6);
  const [showModal, setShowModal] = useState(false);

  const renderItems = [];

  for (let i = 0; i < 6; i++) {
    renderItems.push(
      <div
        key={i}
        className="w-[400px] h-[400px] bg-primary-color/10 border border-gray-200 rounded-lg shadow"
      >
        <div className="flex flex-col h-[400px] justify-center items-center">
          <div className="w-[250px] h-[250px] aspect-square bg-primary-color/20 rounded-lg animate-pulse"></div>
          <div className="w-[300px] h-[40px] bg-primary-color/20 rounded-lg mt-10 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl min-h-[400px] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full mb-8">
          <div className="font-semibold text-[36px]">Products</div>
          <Link
            href={"/products"}
            className="font-semibold text-[18px] hover:underline decoration-2 underline-offset-2"
          >
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 px-8">
          {limitedProducts
            ? limitedProducts?.map((products: any, index: number) => (
                <div
                  key={index}
                  className=" bg-primary-color/10 border border-gray-200 rounded-lg shadow "
                >
                  <div className="flex flex-col h-[400px]">
                    <div
                      className="flex-grow h-[80%] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.2)] hover:drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
                      onClick={() => {
                        setShowModal(true);
                        setProductId(products.product_id);
                      }}
                    >
                      <Image
                        className="object-contain h-full rounded-t-lg scale-105 hover:scale-110 transition-all "
                        loader={myLoader}
                        src={products.imageUrl}
                        width={500}
                        height={500}
                        alt={products.product_name}
                      />
                    </div>
                    <div className="px-5 pb-5 h-[20%]">
                      <h5 className="text-[18px] font-semibold tracking-tight text-gray-900 text-center">
                        {products.product_name}
                      </h5>
                    </div>
                  </div>
                </div>
              ))
            : renderItems}
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex justify-center p-10">
          <div className="w-[50%] flex justify-center items-center drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)]">
            {productById.data?.imageUrl ? (
              <Image
                className="object-contain h-full rounded-t-lg transition-all -mt-16"
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
                <div className="font-bold text-[18px]">Nama Produk:</div>
                <div className="text-gray-600">
                  {productById.data?.product_name}
                </div>
                <div className="w-full h-[1px] bg-black mb-5"></div>
              </>
            ) : null}
            {productById.data?.Category.category ? (
              <>
                <div className="font-bold text-[18px]">Kategori:</div>
                <div className="text-gray-600">
                  {productById.data?.Category.category}
                </div>
                <div className="w-full h-[1px] bg-black mb-5"></div>
              </>
            ) : null}
            {productById.data?.description ? (
              <>
                <div className="font-bold text-[18px]">Deskripsi:</div>
                <div className="text-gray-600">
                  {productById.data?.description}
                </div>
                <div className="w-full h-[1px] bg-black mb-5"></div>
              </>
            ) : null}
            {productById.data?.dimeonsions ? (
              <>
                <div className="font-bold text-[18px]">Dimensi:</div>
                <div className="text-gray-600">
                  {productById.data?.dimensions}
                </div>
                <div className="w-full h-[1px] bg-black mb-5"></div>
              </>
            ) : null}
            {productById.data?.material ? (
              <>
                <div className="font-bold text-[18px]">Material:</div>
                <div className="text-gray-600">
                  {productById.data?.material}
                </div>
                <div className="w-full h-[1px] bg-black mb-5"></div>
              </>
            ) : null}
            {productById.data?.color ? (
              <>
                <div className="font-bold text-[18px]">Warna:</div>
                <div className="text-gray-600">{productById.data?.color}</div>
                <div className="w-full h-[1px] bg-black mb-5"></div>
              </>
            ) : null}
            {productById.data?.price ? (
              <>
                <div className="font-bold text-[18px]">Harga:</div>
                <div className="text-gray-600">
                  {<FormatRupiah value={productById.data?.price} />}
                </div>
                <div className="w-full h-[1px] bg-black mb-5"></div>
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
