import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { EffectFade, FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import Image, { ImageLoader } from "next/image";

const SwiperComponent = ({ data }: any) => {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };
  const [slidePerViewSwiper, setSlidePerViewSwiper] = useState(4);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    if (mediaQuery.matches) {
      setSlidePerViewSwiper(2);
    } else {
      setSlidePerViewSwiper(4);
    }
  }, []);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="w-full h-full relative mt-2">
      <div className="w-full h-full relative">
        <Swiper
          spaceBetween={10}
          effect={"fade"}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Pagination, EffectFade]}
          pagination={true}
          className="mb-2"
        >
          {data?.blog_images &&
            data?.blog_images?.map((blogImages: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="relative h-[400px] overflow-hidden z-20 flex justify-center items-center">
                  <div
                    className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
                  ></div>
                  <Image
                    className={`absolute w-full h-full`}
                    loader={myLoader}
                    src={blogImages?.imageUrl}
                    width={500}
                    height={500}
                    alt={data?.title}
                    priority
                  />
                  <Image
                    className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                    loader={myLoader}
                    src={blogImages?.imageUrl}
                    width={500}
                    height={500}
                    alt={data?.title}
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="w-10 h-10 flex justify-center items-center swiper-button-prev-custom text-white text-[30px] absolute top-[50%] translate-y-[-50%] z-[40] left-0 hover:text-gray-300 hover:cursor-pointer transition-all">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="w-10 h-10 flex justify-center items-center swiper-button-next-custom text-white text-[30px] absolute top-[50%] translate-y-[-50%] z-[40] right-0 hover:text-gray-300 hover:cursor-pointer transition-all">
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <Swiper
        //@ts-ignore
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={slidePerViewSwiper}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data?.blog_images &&
          data?.blog_images.length > 1 &&
          data?.blog_images?.map((blogImages: any, index: number) => (
            <SwiperSlide className="w-full h-full relative" key={index}>
              <div
                className={`my-swiper-slide-active w-full h-full absolute z-30`}
              ></div>
              <div className="relative h-[200px] overflow-hidden z-20 flex justify-center items-center hover:cursor-pointer">
                <div
                  className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
                ></div>
                <Image
                  className={`absolute w-full h-full`}
                  loader={myLoader}
                  src={blogImages?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.title}
                  priority
                />
                <Image
                  className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                  loader={myLoader}
                  src={blogImages?.imageUrl}
                  width={500}
                  height={500}
                  alt={data?.title}
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
