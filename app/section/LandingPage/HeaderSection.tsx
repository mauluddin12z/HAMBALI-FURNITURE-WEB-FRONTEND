"use client";
import React, { useEffect, useState } from "react";

export default function HeaderSection() {
  const navItemMenu = [
    {
      name: "Home",
      link: "#",
    },
    {
      name: "Products",
      link: "#products",
    },
    {
      name: "Gallery",
      link: "#gallery",
    },
    {
      name: "About Us",
      link: "#aboutus",
    },
    {
      name: "Contact Us",
      link: "#contactus",
    },
  ];

  const socialMedia = [
    {
      icon: "instagram",
      link: "https://www.instagram.com/hambalifurniture",
    },
  ];

  const [searchValue, setSearchValue] = useState("");

  const [searchFormVisible, setSearchFormVisible] = useState(false);

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  const handleChangeSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const threshold = 200;
      setScrolled(position > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full z-30 transition-all ${
        scrolled
          ? " bg-white shadow-[0px_0px_10px] shadow-black/10 fixed -top-[100px] translate-y-[100px]"
          : "absolute"
      }`}
    >
      <div className="max-w-7xl flex items-center justify-between mx-auto py-6">
        <a
          href="#"
          className="self-center text-[24px] font-semibold flex flex-col"
        >
          <span className="text-primary-color">Hambali</span>
          <span className="text-black -mt-1">Furniture</span>
        </a>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex items-center gap-x-3">
            {navItemMenu &&
              navItemMenu?.map((navItem: any, index: number) => (
                <li key={index}>
                  <a
                    href={navItem.link}
                    className="text-black hover:text-primary-color font-medium transition-all px-4"
                  >
                    {navItem.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex items-center gap-x-3">
            <li className="relative">
              <button
                className="text-[22px] transition-all w-6 text-black hover:text-primary-color"
                onClick={() => setSearchFormVisible((prev) => !prev)}
              >
                <i
                  className={`fa-solid ${
                    searchFormVisible ? "fa-xmark" : "fa-magnifying-glass"
                  } `}
                ></i>
              </button>
              <div
                id="searchForm"
                className={`absolute -right-4 left-auto transition-all z-20 ${
                  searchFormVisible
                    ? "opacity-100 top-20"
                    : "opacity-0 top-32 -z-10 pointer-events-none"
                }`}
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    className="focus:ring-4 focus:ring-blue-400 focus:outline-none border pl-4 pr-24 py-5 shadow-lg"
                    type="text"
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                    placeholder="Cari lemari, meja, rak..."
                  />
                  <button
                    type="submit"
                    className="absolute text-[22px] right-4 top-4"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </li>
            {socialMedia &&
              socialMedia?.map((socialMedia: any, index: number) => (
                <li key={index}>
                  <a
                    href={socialMedia.link}
                    target="_blank"
                    className="text-black hover:text-primary-color text-[22px] transition-all px-4"
                  >
                    <i className={`fa-brands fa-${socialMedia.icon}`}></i>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
