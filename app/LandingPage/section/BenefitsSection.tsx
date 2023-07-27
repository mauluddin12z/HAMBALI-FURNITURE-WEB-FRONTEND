import React from "react";
import CraftsMan from "@/public/images/craftsman.svg";
import CustomizeIcon from "@/public/images/customizeIcon.svg";
import FurniIcon from "@/public/images/furniIcon.svg";
import InstallationIcon from "@/public/images/installationIcon.svg";
import { useInView } from "react-intersection-observer";

export default function BenefitSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="lg:max-w-5xl md:max-w-6xl mx-auto lg:px-0 px-2">
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-4">
        <div
          ref={ref}
          className={`flex flex-col justify-center items-center rounded-lg bg-secondary-color p-6 shadow transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="w-[50px] aspect-square mb-4">
            <CustomizeIcon />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-600">
            Bisa Custom sesuai keinginan
          </div>
        </div>
        <div
          ref={ref}
          className={`flex flex-col justify-center items-center rounded-lg bg-secondary-color p-6 shadow transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="w-[50px] aspect-square mb-4">
            <CraftsMan />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-600">
            Tenaga ahli yang berpengalaman
          </div>
        </div>
        <div
          ref={ref}
          className={`flex flex-col justify-center items-center rounded-lg bg-secondary-color p-6 shadow transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="w-[50px] aspect-square mb-4">
            <FurniIcon />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-600">
            Menyediakan Furniture untuk Exterior dan Interior
          </div>
        </div>
        <div
          ref={ref}
          className={`flex flex-col justify-center items-center rounded-lg bg-secondary-color p-6 shadow transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="w-[50px] aspect-square mb-4">
            <InstallationIcon />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-600">
            Menyediakan layanan pengiriman dan pemasangan
          </div>
        </div>
      </div>
    </div>
  );
}
