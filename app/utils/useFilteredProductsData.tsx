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
  let urlTotalProducts = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts`;

  const addQueryParam = (paramName: string, paramValue: any) => {
    if (paramValue !== undefined && paramValue !== null) {
      if (urlTotalProducts.includes("?")) {
        urlTotalProducts += `&${paramName}=${paramValue}`;
      } else {
        urlTotalProducts += `?${paramName}=${paramValue}`;
      }
      if (urlProducts.includes("?")) {
        urlProducts += `&${paramName}=${paramValue}`;
      } else {
        urlProducts += `?${paramName}=${paramValue}`;
      }
    }
  };

  if (filter.limit || filter.start) {
    urlProducts += `?start=${filter.start}&limit=${filter.limit}`;
  }

  if (filter.categoryQuery > 0) {
    addQueryParam("categoryQuery", filter.categoryQuery);
  }
  if (filter.searchQuery?.length > 0) {
    addQueryParam("searchQuery", filter.searchQuery);
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
    {
      revalidateOnMount: filter.revalidate ? filter.revalidate : false,
      refreshInterval: filter.revalidate ? 1000 : 0,
    }
  );

  const { data: totalFilteredProducts, mutate: mutateTotalProducts } = useSWR(
    ["products", urlTotalProducts, filter.categoryQuery, filter.searchQuery],
    () => fetcher(`${urlTotalProducts}`),
    {
      revalidateOnMount: filter.revalidate ? filter.revalidate : false,
      refreshInterval: filter.revalidate ? 1000 : 0,
    }
  );

  useEffect(() => {
    mutateProducts();
    mutateTotalProducts();
  }, [filter, mutateProducts, mutateTotalProducts]);

  return { filteredProducts, totalFilteredProducts };
};

export default useFilteredProductsData;
