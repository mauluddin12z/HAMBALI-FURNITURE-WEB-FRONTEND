"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image, { ImageLoader } from "next/image";
import useSWR from "swr";
import Link from "next/link";
import URLGenerator from "@/app/utils/URLGenerator";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "@/app/components/SwiperComponent";

const getCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category`
  );
  return res.data;
};

export default function CategoriesSection() {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [cardIsHovered, setcardIsHovered] = useState(-1);

  const handleOutsideLayerHover = (index: number) => {
    setcardIsHovered(index);
  };

  const handleOutsideLayerLeave = () => {
    setcardIsHovered(-1);
  };

  const { data } = useSWR("categories", getCategories);

  const [slidePerViewSwiper, setslidePerViewSwiper] = useState(4);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setslidePerViewSwiper(1);
    } else {
      setslidePerViewSwiper(4);
    }
  }, []);

  const renderItems = [];

  for (let i = 0; i < slidePerViewSwiper; i++) {
    renderItems.push(
      <div
        key={i}
        className="border w-full border-gray-200 shadow h-[450px] flex justify-center items-center p-4"
      >
        <div className="w-full h-full aspect-square bg-secondary-color animate-pulse"></div>
      </div>
    );
  }
  return (
    <div className="lg:max-w-7xl md:max-w-6xl min-h-[400px] mx-auto px-2">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-full mb-8">
          <div className="font-semibold lg:text-[36px] text-[28px]">Categories</div>
          <Link
            href={"/categories"}
            className="font-semibold text-[18px] hover:underline decoration-2 underline-offset-2"
          >
            View All
          </Link>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <SwiperComponent slidePerViewSwiper={slidePerViewSwiper}>
            <div
              className={`w-full h-full ${
                data
                  ? "flex"
                  : `lg:grid lg:grid-cols-4 flex flex-nowrap lg:flex-wrap gap-2`
              }`}
            >
              {data
                ? data?.map((categories: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Link
                        href={`/categories/${URLGenerator(
                          categories?.category
                        )}`}
                        className="w-full h-full"
                      >
                        <div className="flex flex-col h-[400px] relative">
                          <div className="drop-shadow-[0px_0px_5px_rgba(0,0,0,0.2)] hover:drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)] transition-all cursor-pointer w-full h-full">
                            <Image
                              className={`object-contain w-full h-full rounded-t-lg transition-all duration-1000 ${
                                cardIsHovered === index
                                  ? "scale-90"
                                  : "scale-75 "
                              } transition-all`}
                              loader={myLoader}
                              src={categories.imageUrl}
                              width={500}
                              height={500}
                              alt={categories.category}
                            />
                          </div>
                          <div
                            className="absolute flex justify-center items-center w-full h-full scale-90 border-[5px] border-white z-20"
                            onMouseEnter={() => handleOutsideLayerHover(index)}
                            onMouseLeave={handleOutsideLayerLeave}
                          >
                            <div className="place-self-center text-[24px] font-bold tracking-tight text-white hover:text-blue text-center hover:underline underline-offset-4 decoration-3 z-30 flex justify-center items-center">
                              <span className="">{categories.category}</span>
                            </div>
                          </div>
                          <div
                            className="absolute w-full h-full bg-black/50 backdrop-blur-sm z-10"
                            onMouseEnter={() => handleOutsideLayerHover(index)}
                            onMouseLeave={handleOutsideLayerLeave}
                          ></div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                : renderItems}
            </div>
          </SwiperComponent>
        </div>
      </div>
    </div>
  );
}
