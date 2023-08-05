"use client"
import React from 'react'
import AdministratorLayout from '../components/AdministratorLayout'
import axios from "axios";
import Link from "next/link";
import ProductTable from "./ProductTable";

export default function Page() {
    return (
        <AdministratorLayout>
            <ProductTable />
        </AdministratorLayout>
    )
}
