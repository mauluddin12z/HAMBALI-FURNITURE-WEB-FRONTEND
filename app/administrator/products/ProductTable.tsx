import React, { useState } from "react";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import { FormatRupiah } from "@arismun/format-rupiah";
import Pagination from "@/app/components/Pagination";
import axios from "axios";
import useSWR from "swr";

const getProducts = async (
    start: number,
    limit: number,
    categoryQuery: number,
    searchQuery: string
) => {
    let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?start=${start}&limit=${limit}`;

    if (categoryQuery > 0) {
        url += `&categoryQuery=${categoryQuery}`;
    }
    if (searchQuery !== "") {
        url += `&searchQuery=${searchQuery}`;
    }

    const res = await axios.get(url);
    return res.data;
};

const getTotalProducts = async (categoryQuery: number, searchQuery: string) => {
    let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?`;

    if (categoryQuery > 0) {
        url += `&categoryQuery=${categoryQuery}`;
    }
    if (searchQuery !== "") {
        url += `&searchQuery=${searchQuery}`;
    }

    const res = await axios.get(url);
    return res.data;
};

export default function ProductTable() {
    const myLoader: ImageLoader = ({ src }) => {
        return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
    };
    const [start, setStart] = useState(0);
    const [limit, setLimit] = useState(6);
    const [categoryQuery, setCategoryQuery] = useState(-1);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: products } = useSWR(
        ["products", start, limit, categoryQuery, searchQuery],
        () => getProducts(start, limit, categoryQuery, searchQuery)
    );

    const { data: totalProducts } = useSWR(
        ["totalProducts", categoryQuery, searchQuery],
        () => getTotalProducts(categoryQuery, searchQuery)
    );

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 p-10">
            <div className="flex items-center justify-between pb-4 mb-10">
                <div>
                    <button
                        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
                        type="button">
                        Last 30 days<i className="fa-solid fa-chevron-down ml-4"></i>
                    </button>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <i
                            className="fa-solid fa-magnifying-glass"
                        ></i>
                    </div>
                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value), setStart(0); }} />
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 mb-10">
                <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dimensions
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Material
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Colors
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products ? (
                        products?.map((products: any, index: number) => (
                            <tr key={index} className="bg-white border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {products.product_name ? (products.product_name) : "-"}
                                </th>
                                <td className="px-6 py-4">
                                    {products.category.category ? (products.category.category) : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    {products.imageUrl ? (
                                        <div className="w-[200px] aspect-square">
                                            <Image
                                                className="object-contain h-full"
                                                loader={myLoader}
                                                src={products?.imageUrl}
                                                width={200}
                                                height={200}
                                                alt={products?.product_name}
                                                priority
                                            />
                                        </div>
                                    ) : "-"}

                                </td>
                                <td className="px-6 py-4">
                                    <div className="truncate line-clamp-[6] whitespace-pre-wrap text-justify">
                                        {products.description ? (products.description) : "-"}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {products?.price ? <FormatRupiah value={products?.price} /> : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    {products.dimensions ? (products.dimensions) : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    {products.material ? (products.material) : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    {products.color ? (products.color) : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href="#" className="font-medium text-blue-600 hover:underline">Edit</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </table>
            <Pagination
                totalData={totalProducts}
                start={start}
                setStart={setStart}
                limit={limit}
            />
        </div>
    )
}
