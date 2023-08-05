"use client"
import React, { useEffect, useState } from "react"
import Sidebar from "./sidebar";
import useAuth from "../utils/useAuth";
import Loading from "@/app/components/Loading";

export default function AdministratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isUserLoggedIn } = useAuth()
    const [sidebarCollapse, setSidebarCollapse] = useState(false);
    const sidebarCollapseToggle = async () => {
        setSidebarCollapse((prev) => !prev)
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1024px)");

        if (mediaQuery.matches) {
            setSidebarCollapse(true);
        } else {
            setSidebarCollapse(false);
        }
    }, []);

    if (!isUserLoggedIn)
        return (
            <Loading />
        );

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-100">
            <Sidebar sidebarCollapse={sidebarCollapse} sidebarCollapseToggle={sidebarCollapseToggle} />
            <div className={`${sidebarCollapse ? "lg:pl-[70px]" : "lg:pl-[270px]"} pl-[70px] min-h-screen transition-all duration-100`}>
                <div className="w-full min-h-screen lg:px-10 px-2 my-10">{children}</div>
            </div>
        </div>
    );
}
