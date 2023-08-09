"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("administrator/login");
  }, [router]);

  return (
    <div className="w-full h-screen bg-dark-background-1 flex flex-col justify-center items-center">
      <div className="text-[48px] lg:text-[72px] font-bold">404</div>
      <Link
        href={"/administrator/login"}
        className="text-white text-[12px] lg:text-[14px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-10 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Go to login page
      </Link>
    </div>
  );
}
