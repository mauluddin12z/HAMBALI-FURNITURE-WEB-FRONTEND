"use client";
import React, { useState } from "react";
import Image from "next/image";
import HambaliFurnitureLogo from "@/public/images/LogoHambaliFurniture.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

export default function Sidebar({
  sidebarCollapse,
  sidebarCollapseToggle,
}: any) {
  const router = useRouter();
  const [isMenuHovered, setIsMenuHovered] = useState(-1);
  const [isLogoutMenuHovered, setIsLogoutMenuHovered] = useState(false);
  const logout = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_MY_BACKEND_URL}logout`, {
        withCredentials: true,
      });
      router.push("/administrator/login");
    } catch (error) {
      console.log(error);
    }
  };
  const menu = [
    {
      menu: "Products",
      icon: "fa-solid fa-box",
      link: "/administrator/products",
    },
    {
      menu: "Categories",
      icon: "fa-solid fa-list",
      link: "/administrator/categories",
    },
    {
      menu: "Blogs",
      icon: "fa-brands fa-blogger-b",
      link: "/administrator/blogs",
    },
    {
      menu: "Users",
      icon: "fa-solid fa-user",
      link: "/administrator/users",
    },
  ];

  const pathname = usePathname();
  return (
    <>
      <div
        onClick={() => sidebarCollapseToggle()}
        className={`lg:hidden ${
          sidebarCollapse ? "hidden" : "block"
        } fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60] w-full h-screen`}
      ></div>
      <div
        className={`h-screen fixed left-0 ${
          sidebarCollapse ? "w-[70px] px-2" : "w-[270px] px-4"
        } shadow rounded-r-xl py-10 bg-white transition-all duration-100 z-[70]`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex items-center ${
              sidebarCollapse ? "justify-center" : "justify-between"
            } relative`}
          >
            {!sidebarCollapse && (
              <Link href={"/administrator/products"}>
                <Image
                  src={HambaliFurnitureLogo}
                  width={70}
                  height={70}
                  alt="logoHambaliFurnitre"
                  className="w-auto h-auto"
                  priority
                />
              </Link>
            )}

            <div
              onClick={() => sidebarCollapseToggle()}
              className={`text-[20px] text-gray-500 hover:text-black w-10 h-10 flex justify-center items-center bg-white cursor-pointer transition-all `}
            >
              <i
                className={`fa-solid fa-angles-${
                  sidebarCollapse ? "right" : "left"
                }`}
              ></i>
            </div>
          </div>
          <div className="my-10">
            <hr />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <ul className="flex flex-col gap-y-2">
                {menu &&
                  menu?.map((menu: any, index: number) => (
                    <li key={index}>
                      <Link
                        href={menu.link}
                        className={`flex items-center gap-x-4 relative ${
                          sidebarCollapse
                            ? "py-4 px-2 justify-center rounded-lg"
                            : "py-3 px-6 rounded-full"
                        } hover:text-black hover:bg-secondary-color ${
                          pathname === menu.link
                            ? "text-black bg-secondary-color"
                            : "text-gray-500"
                        }`}
                        onMouseEnter={() => setIsMenuHovered(index)}
                        onMouseLeave={() => setIsMenuHovered(-1)}
                      >
                        <div className="text-[20px] w-6 h-auto flex justify-center items-center">
                          <i className={menu.icon}></i>
                        </div>
                        {!sidebarCollapse && (
                          <div className="text-[14px]">{menu.menu}</div>
                        )}
                        {sidebarCollapse && (
                          <div
                            className={`absolute text-[14px] translate-x-[70px] bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-full left-0 ${
                              isMenuHovered === index ? "block" : "hidden"
                            } border transition-all ease-out`}
                          >
                            {menu.menu}
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <button
              onMouseEnter={() => setIsLogoutMenuHovered(true)}
              onMouseLeave={() => setIsLogoutMenuHovered(false)}
              onClick={() => logout()}
              className={`flex items-center gap-x-4 ${
                sidebarCollapse
                  ? "py-4 px-2 justify-center rounded-lg"
                  : "py-3 px-6 rounded-full"
              } hover:text-black hover:bg-secondary-color`}
            >
              <div className="text-[20px] w-6 h-auto flex justify-center items-center">
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
              {!sidebarCollapse && <div className="text-[14px]">Sign Out</div>}
              {sidebarCollapse && (
                <div
                  className={`absolute text-[14px] whitespace-nowrap translate-x-[80px] bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-full left-0 ${
                    isLogoutMenuHovered ? "block" : "hidden"
                  } border transition-all ease-out`}
                >
                  Sign Out
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
