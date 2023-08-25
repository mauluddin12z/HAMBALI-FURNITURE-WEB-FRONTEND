"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundOpening from "@/public/images/background_opening.jpg";
import { useInView } from "react-intersection-observer";

export default function OpeningSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="relative overflow-hidden">
      <div className="lg:flex -bottom-[400px] gap-10 absolute -rotate-45 hidden">
        <div className="h-[1200px] w-14 bg-gradient-to-b from-primary-color/25 via-primary-color/10 to-primary-color/0"></div>
        <div className="h-[1200px] w-14 bg-gradient-to-b from-primary-color/25 via-primary-color/10 to-primary-color/0"></div>
        <div className="h-[1200px] w-14 bg-gradient-to-b from-primary-color/25 via-primary-color/10 to-primary-color/0"></div>
      </div>
      <div
        ref={ref}
        className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl h-screen mx-auto 2xl:px-0 px-4 pt-[150px]"
      >
        <div className="absolute w-[600px] aspect-square bg-blue-100/30 blur-2xl rounded-full left-0 top-0"></div>
        <div className="absolute w-[500px] aspect-square bg-primary-color/5 blur-3xl rounded-full left-1/2"></div>
        <div className="absolute lg:w-[400px] w-[200px] aspect-square bg-primary-color/10 blur-3xl rounded-full right-0.5 bottom-[5%]"></div>
        <div className="flex items-center w-full h-full">
          <div className="lg:w-6/12 pr-10 z-10">
            <div className="flex flex-col h-full justify-center overflow-hidden lg:overflow-visible">
              <div
                className={`font-extrabold lg:text-[52px] text-[36px] text-black text-left lg:mb-14 mb-8 z-10 transition-all duration-1000 ${
                  inView
                    ? "translate-x-[0%] opacity-100"
                    : "translate-x-[-50%] opacity-0"
                }`}
              >
                Furniture Modern untuk Ruangan Anda
              </div>
              <div
                className={`text-[18px] text-gray-600 mb-14 transition-all duration-1000 ease-in-out delay-150 ${
                  inView
                    ? "translate-x-[0%] opacity-100"
                    : "translate-x-[-50%] opacity-0"
                }`}
              >
                <span className="font-bold text-black">
                  Hambali Furniture,{" "}
                </span>
                Menghadirkan Kecantikan Minimalis dan Modern dalam Setiap
                Ruangan!. Jika berminat silahkan hubungi kontak dibawah.
              </div>
              <div
                className={`h-[60px] z-10 transition-all duration-1000 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <Link
                  href={"https://wa.me/6281274278235"}
                  target="_blank"
                  className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-full text-sm px-7 py-4 text-center mr-2 mb-2 "
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:block hidden w-6/12 pl-10">
            <div
              className={`flex justify-center items-center transition-all duration-1000 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="2xl:w-[600px] lg:w-[500px] aspect-square relative">
                <Image
                  className="z-[20] w-full h-full absolute"
                  src={backgroundOpening}
                  width={1000}
                  height={1000}
                  alt="background"
                  priority
                />
                <div className="z-[10] w-full aspect-square border-[10px] border-secondary-color absolute -top-[50px] -right-[50px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
