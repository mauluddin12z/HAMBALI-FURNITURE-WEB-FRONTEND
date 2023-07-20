"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import backgroundOpening from "@/public/images/background_opening.jpg";

export default function OpeningSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="lg:flex -bottom-[400px] gap-10 absolute -rotate-45 hidden">
        <div className="h-[1200px] w-14 bg-gradient-to-b from-primary-color/25 via-primary-color/10 to-primary-color/0"></div>
        <div className="h-[1200px] w-14 bg-gradient-to-b from-primary-color/25 via-primary-color/10 to-primary-color/0"></div>
        <div className="h-[1200px] w-14 bg-gradient-to-b from-primary-color/25 via-primary-color/10 to-primary-color/0"></div>
      </div>
      <div className="lg:max-w-7xl md:max-w-6xl h-screen mx-auto lg:px-0 px-3">
        <div className="absolute w-[600px] aspect-square bg-blue-100/30 blur-2xl rounded-full left-0 top-0"></div>
        <div className="absolute w-[500px] aspect-square bg-primary-color/5 blur-3xl rounded-full left-1/2"></div>
        <div className="absolute lg:w-[400px] w-[200px] aspect-square bg-primary-color/10 blur-3xl rounded-full right-0.5 bottom-[5%]"></div>
        <div className="flex items-center w-full h-full lg:mt-8 mt-16">
          <div className="lg:w-6/12 pr-10 z-10">
            <div className="flex flex-col h-full justify-center">
              <div className="font-extrabold lg:text-[52px] text-[36px] text-black text-left lg:mb-14 mb-8 z-10">
                Furniture Modern untuk Ruangan Anda
              </div>
              <div className="text-[18px] text-gray-600 mb-14">
                <span className="font-bold text-black">Hambali Furniture. </span>
                Menghadirkan Kecantikan Minimalis dan Modern dalam Setiap
                Ruangan!. Jika berminat silahkan hubungi kontak dibawah.
              </div>
              <div className="h-[60px] z-10">
                <Link
                  href={"https://wa.me/6281369982678"}
                  target="_blank"
                  className="text-white bg-gradient-to-r from-primary-color via-blue-400 to-primary-color hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-full text-sm px-7 py-4 text-center mr-2 mb-2 "
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:block hidden w-6/12 pl-10">
            <div className="flex justify-center items-center relative">
              <div className="w-[600px] h-[600px] border-[10px] border-secondary-color absolute -top-[50px] -right-[50px]"></div>
              <Image
                className="z-10 w-[600px] h-[600px]"
                src={backgroundOpening}
                width={1000}
                height={1000}
                alt="background"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
