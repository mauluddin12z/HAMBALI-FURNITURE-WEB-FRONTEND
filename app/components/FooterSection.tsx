"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Image from "next/image";
import LogoHambaliFurniture from "@/public/images/LogoHambaliFurniture.png";
import URLGenerator from "../utils/URLGenerator";

const getProducts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products`
  );
  return res.data;
};
const getCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category`
  );
  return res.data;
};

export default function FooterSection() {
  const socialMedia = [
    {
      icon: "instagram",
      link: "https://www.instagram.com/hambalifurniture",
    },
    {
      icon: "facebook",
      link: "https://www.instagram.com/hambalifurniture",
    },
  ];

  const { data } = useSWR("products", getProducts);
  const limitedProducts = data?.slice(0, 6);
  const categories = useSWR("categories", getCategories);
  const limitedCategories = categories.data?.slice(0.6);

  return (
    <div className="bg-secondary-color min-h-[300px]">
      <div className="lg:max-w-7xl md:max-w-6xl flex items-center justify-between mx-auto lg:py-24 py-16 px-8 lg:px-0">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
          <div className="flex justify-center items-center">
            <div className="flex flex-col">
              <div className="flex">
                <Image
                  src={LogoHambaliFurniture}
                  width={110}
                  height={110}
                  alt="logoHambaliFurnitre"
                  className="mb-4"
                  priority
                />
              </div>
              <div className="text-[14px] text-gray-600 mb-4">
                Hambali Furniture adalah perusahaan penjualan furniture yang
                berbasis di Palembang. Kami memiliki spesialisasi dalam
                menyediakan furnitur modern dan minimalis yang menghadirkan
                sentuhan elegan dan fungsional untuk rumah dan ruang kerja Anda.
              </div>
              <div className="flex gap-x-1">
                {socialMedia &&
                  socialMedia?.map((socialMedia: any, index: number) => (
                    <a
                      key={index}
                      href={socialMedia.link}
                      target="_blank"
                      className="text-gray-600 hover:text-black text-[22px] transition-all p-1"
                    >
                      <i className={`fa-brands fa-${socialMedia.icon}`}></i>
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex lg:justify-center items-center">
            <div className="flex flex-col">
              <div className="font-bold text-[28px] mb-4">Products</div>
              <ul className="flex flex-col gap-y-1">
                {limitedProducts &&
                  limitedProducts?.map((products: any, index: number) => (
                    <li
                      key={index}
                      className="text-gray-600 hover:text-black text-[14px]"
                    >
                      <Link
                        href={`/products/${URLGenerator(
                          products.product_name
                        )}`}
                      >
                        {products.product_name}
                      </Link>
                    </li>
                  ))}
                <li className="text-gray-600 hover:text-black text-[14px]">
                  <Link href={"/products"}>View more</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex lg:justify-center items-center">
            <div className="flex flex-col">
              <div className="font-bold text-[28px] mb-4">Categories</div>
              <ul className="flex flex-col gap-y-1">
                {limitedCategories &&
                  limitedCategories?.map((categories: any, index: number) => (
                    <li
                      key={index}
                      className="text-gray-600 hover:text-black text-[14px]"
                    >
                      <Link
                        href={`/categories/${URLGenerator(
                          categories.category
                        )}`}
                      >
                        {categories.category}
                      </Link>
                    </li>
                  ))}
                <li className="text-gray-600 hover:text-black text-[14px]">
                  <Link href={"/categories"}>View more</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
