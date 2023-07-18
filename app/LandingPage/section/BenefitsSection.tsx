import React from "react";
import CraftsMan from "@/public/images/craftsman.svg";
import CustomizeIcon from "@/public/images/customizeIcon.svg";
import FurniIcon from "@/public/images/furniIcon.svg";
import InstallationIcon from "@/public/images/installationIcon.svg";

export default function BenefitSection() {
  return (
    <div className="lg:max-w-5xl md:max-w-6xl mx-auto lg:px-0 px-4">
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-4">
        <div className="flex flex-col justify-center items-center rounded-lg bg-secondary-color/50 p-6">
          <div className="w-[50px] aspect-square mb-4">
            <CustomizeIcon />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-400">
            Bisa Custom sesuai keinginan
          </div>
        </div>
        <div className="flex flex-col justify-center items-center rounded-lg bg-secondary-color/50 p-6">
          <div className="w-[50px] aspect-square mb-4">
            <CraftsMan />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-400">
            Tenaga ahli yang berpengalaman
          </div>
        </div>
        <div className="flex flex-col justify-center items-center rounded-lg bg-secondary-color/50 p-6">
          <div className="w-[50px] aspect-square mb-4">
            <FurniIcon />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-400">
            Menyediakan Furniture untuk Exterior dan Interior
          </div>
        </div>
        <div className="flex flex-col justify-center items-center rounded-lg bg-secondary-color/50 p-6">
          <div className="w-[50px] aspect-square mb-4">
            <InstallationIcon />
          </div>
          <div className="text-[12px] lg:text-[14px] text-center text-gray-400">
            Menyediakan layanan pengiriman dan pemasangan
          </div>
        </div>
      </div>
    </div>
  );
}
