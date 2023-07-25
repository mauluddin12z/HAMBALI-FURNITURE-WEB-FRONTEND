import React, { useRef } from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperComponent = ({ children, slidePerViewSwiper }: any) => {
  return (
    <Swiper
      modules={[Navigation, A11y, Autoplay]}
      slideToClickedSlide={true}
      spaceBetween={10}
      slidesPerView={slidePerViewSwiper}
      navigation={{
        prevEl: ".swiper-button-prev-custom",
        nextEl: ".swiper-button-next-custom",
      }}
      autoplay={{ delay: 6000 }}
    >
      {children}
      <div className="flex lg:justify-end justify-center p-4 gap-x-4">
        <button
          type="button"
          className="w-12 h-12  flex justify-center items-center swiper-button-prev-custom text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 text-[16px] rounded-full font-bold"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          type="button"
          className="w-12 h-12  flex justify-center items-center swiper-button-next-custom text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 text-[16px] rounded-full font-bold"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </Swiper>
  );
};

export default SwiperComponent;
