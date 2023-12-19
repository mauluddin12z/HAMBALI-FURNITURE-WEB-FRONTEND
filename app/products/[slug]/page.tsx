"use client";
import React, { useEffect, useState } from "react";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import Image, { ImageLoader } from "next/image";
import { FormatRupiah } from "@arismun/format-rupiah";
import Link from "next/link";
import URLGenerator from "@/app/utils/URLGenerator";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import RelatedProducts from "./relatedProducts";
import MainLayout from "@/app/components/MainLayout";
import useProductByNameData from "@/app/utils/useProductByNameData";
import BreadcrumbNavigation from "@/app/components/breadcrumbNavigation";

export default function Page({ params }: { params: { slug: string } }) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const [productNameQuery, setProductNameQuery] = useState(
    URLToStringGenerator(params.slug)
  );
  const { productByName } = useProductByNameData(productNameQuery);

  const [categoryQuery, setCategoryQuery] = useState();

  useEffect(() => {
    if (productByName && productByName.category_id) {
      setCategoryQuery(productByName.category_id);
    }
  }, [productByName]);

  const breadcrumbNavigationItem = {
    pathHistory: [
      {
        pathname: "Home",
        link: "/",
      },
      {
        pathname: "Products",
        link: "/products",
      },
    ],
    currentPath: {
      pathname: productByName?.product_name,
    },
  };

  return (
    <MainLayout>
      <div className="max-w-7xl min-h-screen mx-auto 2xl:px-0 xl:px-4 px-2 mt-44">
        <div className="flex flex-col w-full">
          <BreadcrumbNavigation
            breadcrumbNavigationItem={breadcrumbNavigationItem}
          />
          <div className="flex lg:flex-row flex-col mb-16">
            {productByName ? (
              <>
                {productByName?.product_name ? (
                    <div className="block lg:hidden font-bold text-[28px]">
                      {productByName?.product_name}
                    </div>
                ) : null}

                {/* Mobile */}
                {productByName?.category.category ? (
                  <div className="block lg:hidden text-[16px] font-medium mb-6">
                    <Link
                      href={`/categories/${URLGenerator(
                        productByName?.category.category
                      )}`}
                    >
                      {productByName.category.category}
                    </Link>
                  </div>
                ) : null}

                <div className="relative overflow-hidden lg:w-[350px] w-full flex rounded-lg mr-14 mb-6 bg-secondary-color flex-shrink-0 justify-center items-center">
                  <Image
                    loader={myLoader}
                    src={productByName?.imageUrl}
                    width={500}
                    height={500}
                    alt={productByName?.product_name}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  {productByName?.product_name ? (
                      <div className="lg:block hidden font-bold lg:text-[24px] text-[14px]">
                        {productByName?.product_name}
                      </div>
                  ) : null}
                  {productByName?.category.category ? (
                    <div className="lg:block hidden text-[16px] font-medium mb-6">
                      <Link
                        href={`/categories/${URLGenerator(
                          productByName?.category.category
                        )}`}
                      >
                        {productByName.category.category}
                      </Link>
                    </div>
                  ) : null}
                  {productByName?.description ? (
                    <div className="mb-3">
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: productByName?.description,
                        }}
                      />
                    </div>
                  ) : null}
                  {productByName?.dimensions ? (
                    <div className="mb-3">
                      <span className="font-bold">Dimensi:</span>
                      <span> {productByName.dimensions}</span>
                    </div>
                  ) : null}
                  {productByName?.material ? (
                    <div className="mb-3">
                      <span className="font-bold">Material:</span>
                      <span> {productByName.material}</span>
                    </div>
                  ) : null}
                  {productByName?.color ? (
                    <div className="mb-3">
                      <span className="font-bold">Warna:</span>
                      <span> {productByName.color}</span>
                    </div>
                  ) : null}
                  {productByName?.price ? (
                    <div className="mb-3">
                      <span className="font-bold">Harga:</span>
                      <span>
                        {" "}
                        {<FormatRupiah value={productByName?.price} />}
                      </span>
                    </div>
                  ) : null}
                  <div className="mt-6">
                    <Link
                      href={"https://wa.me/6281369982678"}
                      target="_blank"
                      className="px-10 py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm text-center"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-[80%] h-8 rounded-lg mb-2 lg:hidden block">
                  <SkeletonLoading />
                </div>
                <div className="w-[30%] h-4 rounded-lg mb-2 lg:hidden block">
                  <SkeletonLoading />
                </div>
                <div className="lg:w-[40%] w-full h-[500px] rounded-lg mr-14 mb-6 lg:block hidden">
                  <SkeletonLoading />
                </div>
                <div className="flex flex-col gap-4 flex-grow w-full">
                  <div className="w-full h-8 rounded-lg hidden lg:block">
                    <SkeletonLoading />
                  </div>
                  <div className="w-[300px] h-5 rounded-lg hidden lg:block">
                    <SkeletonLoading />
                  </div>
                  <div className="w-full h-[200px] rounded-lg">
                    <SkeletonLoading />
                  </div>
                  <div className="w-[300px] h-5 rounded-lg">
                    <SkeletonLoading />
                  </div>
                  <div className="w-[300px] h-5 rounded-lg">
                    <SkeletonLoading />
                  </div>
                  <div className="w-[300px] h-5 rounded-lg">
                    <SkeletonLoading />
                  </div>
                  <div className="w-[300px] h-5 rounded-lg">
                    <SkeletonLoading />
                  </div>
                  <div className="w-[40%] h-10 rounded-full">
                    <SkeletonLoading />
                  </div>
                </div>
              </>
            )}
          </div>
          <RelatedProducts
            categoryQuery={categoryQuery}
            productNameQuery={productNameQuery}
          />
        </div>
      </div>
    </MainLayout>
  );
}
