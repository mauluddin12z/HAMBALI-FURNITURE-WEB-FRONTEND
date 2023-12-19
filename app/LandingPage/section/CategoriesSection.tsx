"use client";
import React, { useEffect, useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import URLGenerator from "@/app/utils/URLGenerator";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "@/app/components/SwiperComponent";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import { useInView } from "react-intersection-observer";
import useCategoriesData from "@/app/utils/useCategoriesData";

export default function CategoriesSection() {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const [cardIsHovered, setCardIsHovered] = useState(-1);

  const handleOutsideLayerHover = (index: number) => {
    setCardIsHovered(index);
  };

  const handleOutsideLayerLeave = () => {
    setCardIsHovered(-1);
  };

  const { categories } = useCategoriesData();

  const [slidePerViewSwiper, setSlidePerViewSwiper] = useState(4);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setSlidePerViewSwiper(1);
    } else {
      setSlidePerViewSwiper(4);
    }
  }, []);

  const renderItems = [];

  for (let i = 0; i < 4; i++) {
    renderItems.push(
      <div
        key={i}
        className="border rounded-lg w-full border-gray-200 shadow h-[450px] flex justify-center items-center p-4"
      >
        <div className="w-full h-full aspect-square">
          <SkeletonLoading />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-[400px] mx-auto xl:px-4 px-2"
    >
      <div
        className={`flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          inView ? "section-transition-on" : "section-transition-off"
        }`}
      >
        <div className="flex justify-between items-center w-full mb-8 overflow-hidden 2xl:overflow-visible">
          <div className={`font-semibold lg:text-[32px] text-[28px]`}>
            Categories
          </div>
          <Link
            href={"/categories"}
            className={`font-semibold text-[18px] hover:underline decoration-2 underline-offset-2`}
          >
            View All
          </Link>
        </div>
        <div className={`w-full h-full flex justify-center items-center`}>
          <SwiperComponent slidePerViewSwiper={slidePerViewSwiper}>
            <div
              className={`w-full h-full ${
                categories
                  ? "flex"
                  : `lg:grid lg:grid-cols-4 flex flex-nowrap lg:flex-wrap gap-2`
              }`}
            >
              {categories ? (
                categories?.map((categories: any, index: number) => (
                  <SwiperSlide key={categories.category_id}>
                    <Link
                      href={`/categories/${URLGenerator(categories?.category)}`}
                      className="w-full h-full"
                    >
                      <div className="flex flex-col justify-center items-center h-[400px] relative rounded-lg overflow-hidden border shadow">
                        <div className="drop-shadow-[0px_0px_5px_rgba(0,0,0,0.2)] hover:drop-shadow-[0px_0px_5px_rgba(0,0,0,0.5)] transition-all cursor-pointer w-full h-full">
                          <Image
                            className={`object-contain w-full h-full rounded-t-lg transition-all duration-300 ${
                              cardIsHovered === index
                                ? "scale-100"
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
                          className={`absolute bottom-[-40px] flex justify-center items-center w-[80%] h-10 transition-all duration-200 hover:bg-white/20 ${
                            cardIsHovered === index
                              ? "border-[2px] border-white bottom-[50%] translate-y-[50%]"
                              : ""
                          } transition- z-20`}
                          onMouseEnter={() => handleOutsideLayerHover(index)}
                          onMouseLeave={handleOutsideLayerLeave}
                        >
                          <div
                            className={`text-[16px] tracking-tight text-white hover:text-blue text-center z-30 flex justify-center items-center opacity-0 transition-all duration-200 ${
                              cardIsHovered === index ? "opacity-100" : ""
                            }`}
                          >
                            View More
                          </div>
                        </div>
                        <div
                          className={`absolute w-full h-full z-10 transition-all duration-200 ${
                            cardIsHovered === index
                              ? "bg-black/80 backdrop-blur-sm"
                              : ""
                          }`}
                          onMouseEnter={() => handleOutsideLayerHover(index)}
                          onMouseLeave={handleOutsideLayerLeave}
                        ></div>
                        <div
                          className={`absolute bottom-[7%] font-semibold text-[18px] transition-opacity duration-300 ${
                            cardIsHovered === index ? "opacity-0" : ""
                          }`}
                        >
                          {categories.category.toUpperCase()}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <>{renderItems}</>
              )}
            </div>
          </SwiperComponent>
        </div>
      </div>
    </div>
  );
}
