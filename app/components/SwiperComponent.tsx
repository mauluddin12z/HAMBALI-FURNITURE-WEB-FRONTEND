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
      <div className="flex justify-center mt-4 gap-x-4 p-4">
        <button
          type="button"
          className="w-40 swiper-button-prev-custom text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm py-2.5"
        >
          <i className="fa-solid fa-arrow-left mr-4 "></i>Previous
        </button>
        <button
          type="button"
          className="w-40 swiper-button-next-custom text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm py-2.5"
        >
          Next<i className="fa-solid fa-arrow-right ml-4"></i>
        </button>
      </div>
    </Swiper>
  );
};

export default SwiperComponent;
