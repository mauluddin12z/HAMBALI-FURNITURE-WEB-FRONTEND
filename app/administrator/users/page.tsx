"use client";
import React from "react";
import AdministratorLayout from "@/app/components/AdministratorLayout";
import UserTable from "./UserTable";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <AdministratorLayout>
      <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-10">
        <div className="flex justify-between mb-10">
          <div className="text-[30px] font-bold">Users</div>
          <button
            onClick={() => router.push("/administrator/users/add")}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Add User
          </button>
        </div>
        <UserTable />
      </div>
    </AdministratorLayout>
  );
}
