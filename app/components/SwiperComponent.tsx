import React, { useRef } from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperComponent = ({ children, slidePerViewSwiper }: any) => {
  return (
    <div className="w-full h-full relative">
      <div className="lg:px-14 px-6">
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
        </Swiper>
      </div>
      <button
        type="button"
        className="w-10 h-10 flex justify-center items-center swiper-button-prev-custom text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 text-[16px] rounded-full font-bold absolute top-[50%] translate-y-[-50%] z-[40] left-0"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button
        type="button"
        className="w-10 h-10 flex justify-center items-center swiper-button-next-custom text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 text-[16px] rounded-full font-bold absolute top-[50%] translate-y-[-50%] z-[40] right-0"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default SwiperComponent;
