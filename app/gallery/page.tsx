"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import SkeletonLoading from "../components/SkeletonLoading";
import Link from "next/link";
import Image, { ImageLoader } from "next/image";
import ImageModal from "../components/ImageModal";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const getBlogImages = async () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogImages`;
  const res = await axios.get(url);
  return res.data;
};
const getTotalBlogImages = async () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogImages`;
  const res = await axios.get(url);
  return res.data;
};
const getBlogImageById = async (id: number) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogImages/${id}`;
  const res = await axios.get(url);
  return res.data;
};

export default function Page() {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const [limit, setLimit] = useState(12);
  const [loadMoreDataIsLoading, setLoadMoreDataIsLoading] = useState(false);
  let { data: blogImages } = useSWR("blogImages", getBlogImages);
  const { data: totalBlogImages } = useSWR(
    "totalBlogImages",
    getTotalBlogImages
  );

  const [limitThreshold, setLimitThreshold] = useState(
    limit >= totalBlogImages?.length
  );

  blogImages = blogImages?.slice(0, limit);

  useEffect(() => {
    setLimitThreshold(limit >= totalBlogImages?.length);
  }, [limit, totalBlogImages?.length]);

  const handleLoadMore = async () => {
    setLoadMoreDataIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setLimit((prev) => prev + 4);

    setLoadMoreDataIsLoading(false);
  };

  const [blogImageId, setBlogImageId] = useState(0);

  const { data: blogImageById } = useSWR(
    blogImageId ? ["blogImageById", blogImageId] : null,
    () => blogImageId && getBlogImageById(blogImageId)
  );

  const [showModal, setShowModal] = useState(false);
  const renderItems = [];
  for (let i = 0; i < 8; i++) {
    renderItems.push(
      <div key={i} className="h-[300px]">
        <SkeletonLoading />
      </div>
    );
  }
  return (
    <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-screen mx-auto lg:px-0 px-2 mt-44">
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full gap-x-4 mb-10 items-center lg:justify-start justify-center bg-secondary-color/60 rounded-lg p-10 text-[12px] lg:text-[16px]">
          <Link href={"/"} className="text-black hover:text-primary-color">
            Home
          </Link>
          <div className="text-black lg:text-[14px]">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
          <div className="text-gray-400">Gallery</div>
        </div>
        <div className="flex lg:justify-start justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">
            Gallery
          </div>
        </div>
        <div className="w-full flex flex-col rounded-lg items-center justify-between">
          <div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-y-2 gap-x-4 mb-10">
            {blogImages ? (
              blogImages?.map((blogImages: any, index: number) => (
                <div key={index} className="flex flex-col">
                  <div
                    className="relative w-full h-[300px] overflow-hidden z-20 flex justify-center items-center hover:opacity-90 hover:cursor-pointer"
                    onClick={() => {
                      setShowModal(true);
                      setBlogImageId(blogImages?.blogImage_id);
                    }}
                  >
                    <div
                      className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
                    ></div>
                    <Image
                      className={`absolute w-full h-full`}
                      loader={myLoader}
                      src={blogImages?.imageUrl}
                      width={500}
                      height={500}
                      alt={"blogImages" + { index }}
                      priority
                    />
                    <Image
                      className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                      loader={myLoader}
                      src={blogImages?.imageUrl}
                      width={500}
                      height={500}
                      alt={"blogImages" + { index }}
                      priority
                    />
                  </div>
                  <div className="text-[16px] text-gray-400 text-center">
                    {format(
                      new Date(blogImages?.createdAt),
                      "EEEE, d MMMM yyyy HH:mm 'WIB'",
                      {
                        locale: id,
                      }
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>{renderItems}</>
            )}
          </div>
          {!loadMoreDataIsLoading && (
            <button
              type="button"
              className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium ${
                limit >= totalBlogImages?.length
                  ? "text-gray-400"
                  : "text-gray-900 hover:text-blue-700"
              } bg-white rounded-lg border border-gray-200 hover:bg-gray-100`}
              onClick={() => handleLoadMore()}
              disabled={limitThreshold}
            >
              Load More
            </button>
          )}
          {loadMoreDataIsLoading && (
            <>
              <div className="rounded-lg flex items-center flex-col">
                <div className="loader-dots block relative w-20 h-5 mt-2">
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                </div>
                <div className="text-gray-500 text-xs font-light mt-2 text-center">
                  Please wait...
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ImageModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="h-[80%] w-[80%] flex justify-center items-center">
          {blogImageById && (
            <div className="flex flex-col h-full">
              <Image
                className={`object-contain h-full z-20 transition-transform duration-500`}
                loader={myLoader}
                src={blogImageById?.imageUrl}
                width={500}
                height={500}
                alt={"blogImages" + blogImageById?.blogImage_id}
                priority
              />
              <div className="text-[16px] text-white text-center">
                {format(
                  new Date(blogImageById?.createdAt),
                  "EEEE, d MMMM yyyy HH:mm 'WIB'",
                  {
                    locale: id,
                  }
                )}
              </div>
            </div>
          )}
        </div>
      </ImageModal>
    </div>
  );
}
