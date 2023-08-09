"use client";
import React from "react";
import AdministratorLayout from "@/app/components/AdministratorLayout";
import AddForm from "./addForm";
import Link from "next/link";

export default function Page() {
  return (
    <AdministratorLayout>
      <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-10">
        <div className="flex items center gap-x-4 mb-10 justify-between">
          <div className="text-[30px] font-bold">Add Blog</div>
          <Link
            href={"/administrator/blogs"}
            className="flex justify-center items-center text-[26px] text-gray-800 hover:text-black"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
        <AddForm />
      </div>
    </AdministratorLayout>
  );
}
