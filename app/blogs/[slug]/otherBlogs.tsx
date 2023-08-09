"use client";
import React, { useEffect, useState } from "react";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import BlogCard from "../BlogCard";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "@/app/components/SwiperComponent";
import useOtherBlogsData from "@/app/utils/useOtherBlogsData";

export default function OtherBlogs({ blogId }: any) {
  const { otherBlogs }: any = useOtherBlogsData(blogId);
  const [visibleRelatedItem, setvisibleRelatedItem] = useState(4);
  const otherProductSliced = otherBlogs?.slice(0, visibleRelatedItem);

  const [isMediaLG, setIsMediaLG] = useState(true);
  const [slidePerViewSwiper, setSlidePerViewSwiper] = useState(4);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setIsMediaLG(false);
      setSlidePerViewSwiper(1);
    } else {
      setIsMediaLG(true);
      setSlidePerViewSwiper(5);
    }
  }, []);

  const renderItems = [];

  for (let i = 0; i < visibleRelatedItem; i++) {
    renderItems.push(
      <div
        key={i}
        className="w-full h-full border border-gray-200 rounded-lg shadow"
      >
        <div className="w-full h-full flex justify-center items-center p-1">
          <div className="w-full h-full aspect-square rounded-lg">
            <SkeletonLoading />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="font-semibold text-[32px] mb-8">Other Blogs</div>

      {isMediaLG ? (
        <div className="grid lg:gap-4 gap-2 lg:grid-cols-4 grid-cols-1">
          {otherProductSliced
            ? otherProductSliced?.map((otherBlogs: any, index: number) => (
                <BlogCard key={index} data={otherBlogs} />
              ))
            : renderItems}
        </div>
      ) : (
        <SwiperComponent slidePerViewSwiper={slidePerViewSwiper}>
          <div className="grid lg:gap-4 gap-2 lg:grid-cols-1 grid-cols-1">
            {otherProductSliced
              ? otherProductSliced?.map((otherBlogs: any, index: number) => (
                  <SwiperSlide key={index}>
                    <BlogCard key={index} data={otherBlogs} />
                  </SwiperSlide>
                ))
              : renderItems}
          </div>
        </SwiperComponent>
      )}
    </div>
  );
}
