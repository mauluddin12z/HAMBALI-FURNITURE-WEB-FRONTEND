"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import LogoHambaliFurniture from "@/public/images/LogoHambaliFurniture.png";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function HeaderSection() {
  const navItemMenu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Categories",
      link: "/categories",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
    {
      name: "About Us",
      link: "/aboutus",
    },
  ];

  const socialMedia = [
    {
      icon: "instagram",
      link: "https://www.instagram.com/hambalifurniture",
    },
    {
      icon: "facebook",
      link: "https://www.instagram.com/hambalifurniture",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, [setMenuVisible]);

  const [searchValue, setSearchValue] = useState("");

  const [searchFormVisible, setSearchFormVisible] = useState(false);

  const handleChangeSearchValue = (e: any) => {
    setSearchValue(e.target.value);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push("/search" + "?" + createQueryString("searchQuery", searchValue));
  };

  const [scrolled, setScrolled] = useState(false);
  const [mediaQuery, setMediaQuery] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    setMediaQuery(
      typeof window !== "undefined"
        ? window.matchMedia("(max-width: 1024px)")
        : null
    );

    const handleScroll = () => {
      const position = typeof window !== "undefined" ? window.pageYOffset : 0;
      const threshold = 200;
      setScrolled(position > threshold);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <nav
      className={
        mediaQuery?.matches
          ? `w-full h-50 bg-white shadow-sm border-b fixed z-50`
          : `w-full z-50 transition-all ${
              scrolled
                ? " bg-white shadow-[0px_0px_10px] shadow-black/10 border-b fixed -top-[100px] translate-y-[100px]"
                : "absolute"
            }`
      }
    >
      <div className="lg:max-w-7xl md:max-w-6xl flex items-center justify-between mx-auto lg:py-6 py-4 px-8 lg:px-0">
        <Link href="/" className="flex flex-col justify-center">
          <Image
            src={LogoHambaliFurniture}
            width={90}
            height={90}
            alt="logoHambaliFurnitre"
            className="h-full"
          />
        </Link>
        <div className="hidden w-full lg:block lg:w-auto">
          <ul className="font-medium flex items-center gap-x-3">
            {navItemMenu &&
              navItemMenu?.map((navItem: any, index: number) => (
                <li key={index}>
                  <Link
                    href={navItem.link}
                    className="text-black hover:text-primary-color font-medium transition-all px-4"
                  >
                    {navItem.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="hidden w-full lg:block lg:w-auto">
          <ul className="font-medium flex items-center gap-x-4">
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
                className={`absolute -right-4 left-auto transition-all z-20 w-96 ${
                  searchFormVisible
                    ? "opacity-100 top-[90px]"
                    : "opacity-0 top-32 -z-10 pointer-events-none"
                }`}
              >
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    className="focus:ring-4 focus:ring-blue-400 focus:outline-none pl-4 pr-14 py-5 w-full shadow-lg border"
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
                    className="text-black hover:text-primary-color text-[22px] transition-all"
                  >
                    <i className={`fa-brands fa-${socialMedia.icon}`}></i>
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Mobile */}

        {mediaQuery?.matches && (
          <>
            <div
              className={`w-full h-auto fixed inset-0 transition-all flex justify-center ${
                searchFormVisible
                  ? "opacity-100 top-[120px]"
                  : "opacity-0 top-[150px] -z-10 pointer-events-none"
              }`}
            >
              <div className="relative w-full flex justify-center">
                <div
                  className="w-full h-full"
                  onClick={() => setSearchFormVisible(false)}
                ></div>
                <form
                  onSubmit={handleSearch}
                  className="z-50 absolute top-0 w-[90%]"
                >
                  <input
                    className="focus:ring-4 focus:ring-blue-400 focus:outline-none pl-4 pr-14 py-5 w-full shadow-lg border"
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
            </div>
            <div className="flex gap-x-4">
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
              <button
                className={`p-2 ${
                  menuVisible
                    ? "fixed z-50 text-black text-[24px]"
                    : "static text-black text-[18px]"
                }`}
                onClick={toggleMenu}
              >
                <i
                  className={`fa-solid ${
                    menuVisible ? "fa-xmark" : "fa-bars"
                  } `}
                ></i>
              </button>
            </div>
            <div
              className={`${
                menuVisible ? "block" : "hidden"
              } w-full h-screen fixed inset-0 bg-secondary-color overflow-hidden`}
            >
              <div className="relative w-full h-full z-10">
                <div className="absolute w-[30%] aspect-square bg-white blur-3xl rounded-full bottom-0 right-0"></div>
                <div className="absolute w-[40%] aspect-square bg-white/50 blur-3xl rounded-full top-0 left-0"></div>
                <div className="relative flex justify-center items-center w-full h-full">
                  <ul className="font-normal flex flex-col justify-center items-center h-full gap-y-8 text-gray-700 z-20">
                    {navItemMenu &&
                      navItemMenu?.map((navItem: any, index: number) => (
                        <li key={index}>
                          <Link
                            href={navItem.link}
                            className="active:text-primary-color transition-all p-4"
                            onClick={() => setMenuVisible(false)}
                          >
                            {navItem.name}
                          </Link>
                        </li>
                      ))}
                    <div className="flex gap-x-6 text-gray-700">
                      {socialMedia &&
                        socialMedia?.map((socialMedia: any, index: number) => (
                          <li key={index}>
                            <a
                              href={socialMedia.link}
                              target="_blank"
                              className="hover:text-primary-color text-[24px] transition-all"
                            >
                              <i
                                className={`fa-brands fa-${socialMedia.icon}`}
                              ></i>
                            </a>
                          </li>
                        ))}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
