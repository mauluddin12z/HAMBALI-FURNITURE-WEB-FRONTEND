import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useFilteredProductsData = (filter: any) => {
  let urlProducts = `${
    process.env.NEXT_PUBLIC_MY_BACKEND_URL
  }filteredProducts?start=${filter.start ? filter.start : 0}&limit=${
    filter.limit ? filter.limit : 6
  }`;
  let urlTotalProducts = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?`;

  if (filter.limit || filter.start) {
    urlProducts += `?start=${filter.start}&limit=${filter.limit}`;
  }

  if (filter.categoryQuery > 0) {
    urlProducts += `&categoryQuery=${filter.categoryQuery}`;
    urlTotalProducts += `categoryQuery=${filter.categoryQuery}`;
  }
  if (filter.searchQuery?.length > 0) {
    urlProducts += `&searchQuery=${filter.searchQuery}`;
    urlTotalProducts += `&searchQuery=${filter.searchQuery}`;
  }

  const { data: filteredProducts, mutate: mutateProducts } = useSWR(
    [
      "products",
      urlProducts,
      filter.start,
      filter.limit,
      filter.categoryQuery,
      filter.searchQuery,
    ],
    () => fetcher(`${urlProducts}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );

  const { data: totalFilteredProducts, mutate: mutateTotalProducts } = useSWR(
    ["products", urlTotalProducts, filter.categoryQuery, filter.searchQuery],
    () => fetcher(`${urlTotalProducts}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );

  useEffect(() => {
    mutateProducts();
    mutateTotalProducts();
  }, [filter, mutateProducts, mutateTotalProducts]);

  return { filteredProducts, totalFilteredProducts };
};

export default useFilteredProductsData;
