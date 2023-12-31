"use client";
import React from "react";
import Image from "next/image";
import FurnitureImg from "@/public/images/background_opening.jpg";
import MainLayout from "../components/MainLayout";
import BreadcrumbNavigation from "../components/breadcrumbNavigation";

export default function Page() {
  const breadcrumbNavigationItem = {
    pathHistory: [
      {
        pathname: "Home",
        link: "/",
      },
    ],
    currentPath: {
      pathname: "About Us",
    },
  };
  return (
    <MainLayout>
      <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-screen mx-auto 2xl:px-0 xl:px-4 px-2 mt-44">
        <div className="flex flex-col">
          <BreadcrumbNavigation
            breadcrumbNavigationItem={breadcrumbNavigationItem}
          />
          <div className="flex justify-center items-center w-full mb-8">
            <div className="font-semibold lg:text-[36px] text-[28px]">
              About Us
            </div>
          </div>
          <div className="w-full min-h-[500px] flex-col">
            <div className="flex lg:flex-row flex-col">
              <div className="w-full">
                <div className="lg:w-[500px] w-full lg:aspect-square flex justify-center items-center">
                  <Image
                    src={FurnitureImg}
                    width={500}
                    height={500}
                    className="object-contain h-full"
                    alt="Furniture Img"
                  />
                </div>
              </div>
              <div className="text-gray-600 text-[16px] text-justify lg:ml-20 ml-0 lg:mt-0 mt-10 flex flex-col gap-y-2 mb-20">
                <p>
                  Hambali Furniture adalah perusahaan penjualan furniture yang
                  berlokasi di kota Palembang. Kami dengan bangga menyediakan
                  koleksi lengkap furnitur modern dan minimalis yang dirancang
                  untuk memberikan sentuhan elegan dan fungsional bagi rumah dan
                  ruang kerja Anda.
                </p>
                <p>
                  Kami memiliki tim tukang yang berpengalaman dan ahli dalam
                  bidang pembuatan furniture. Dengan dedikasi dan keahlian
                  mereka, kami memastikan setiap produk yang kami hasilkan
                  mencerminkan kualitas tinggi dan perhatian terhadap detail
                  yang tak tertandingi. Proses pembuatan furniture kami
                  melibatkan langkah-langkah yang cermat dan teliti, mulai dari
                  pemilihan bahan berkualitas hingga tahap pengerjaan yang
                  presisi.
                </p>
                <p>
                  Setiap furnitur yang kami hasilkan menggabungkan desain yang
                  menawan dengan kenyamanan dan fungsionalitas yang optimal.
                  Dari meja, lemari, rak buku, setiap produk kami dihasilkan
                  dengan perhatian ekstra terhadap detail dan kualitas, sehingga
                  dapat memberikan pengalaman pengguna yang memuaskan.
                </p>
                <p>
                  Kami percaya bahwa furnitur yang baik tidak hanya menjadi
                  hiasan dalam ruangan, tetapi juga memberikan kenyamanan dan
                  kehangatan bagi penghuninya. Oleh karena itu, kami selalu
                  berkomitmen untuk memberikan produk-produk berkualitas tinggi
                  yang memenuhi kebutuhan dan preferensi gaya hidup Anda.
                </p>
                <p>
                  Dapatkan pengalaman berbelanja furnitur yang menyenangkan dan
                  pilihlah Hambali Furniture sebagai mitra Anda dalam
                  menciptakan ruang yang indah dan nyaman. Hubungi kami sekarang
                  untuk informasi lebih lanjut atau kunjungi toko kami untuk
                  melihat langsung koleksi lengkap kami.
                </p>
              </div>
            </div>
            <div className="font-semibold text-[28px] text-center">
              Follow Us on Our Social Media
            </div>
            <div className="flex justify-center items-center gap-12">
              <a
                href="https://www.instagram.com/hambalifurniture"
                className="rounded-lg flex flex-col justify-center items-center gap-2 mt-6 hover:text-primary-color transition-all duration-300"
              >
                <span className="font-semibold lg:text-[16px] text-[14px]">
                  Instagram
                </span>
                <i className="fa-brands fa-instagram lg:text-5xl text-4xl"></i>
              </a>
              <a
                href="https://www.instagram.com/hambalifurniture"
                className="rounded-lg flex flex-col justify-center items-center gap-2 mt-6 hover:text-primary-color transition-all duration-300"
              >
                <span className="font-semibold lg:text-[16px] text-[14px]">
                  Facebook
                </span>
                <i className="fa-brands fa-facebook lg:text-5xl text-4xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
