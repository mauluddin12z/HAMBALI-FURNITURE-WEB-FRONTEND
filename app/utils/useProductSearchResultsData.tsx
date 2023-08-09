import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useProductSearchResultsData = (
  start: number,
  limit: number,
  searchQuery: string
) => {
  let urlProductsSearchResult = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?start=${start}&limit=${limit}`;
  let urlTotalProductsSearchResult = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?`;
  if (searchQuery !== "") {
    urlProductsSearchResult += `&searchQuery=${searchQuery}`;
    urlTotalProductsSearchResult += `&searchQuery=${searchQuery}`;
  }

  const { data: productSearchResults, mutate: mutateProducts } = useSWR(
    ["products", urlProductsSearchResult, start, limit, searchQuery],
    () => fetcher(`${urlProductsSearchResult}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );

  const { data: totalProductSearchResults, mutate: mutateTotalProducts } =
    useSWR(
      ["products", urlTotalProductsSearchResult, searchQuery],
      () => fetcher(`${urlTotalProductsSearchResult}`),
      { revalidateOnMount: true, refreshInterval: 1000 }
    );

  useEffect(() => {
    mutateProducts();
    mutateTotalProducts();
  }, [mutateProducts, mutateTotalProducts, start, limit, searchQuery]);

  return { productSearchResults, totalProductSearchResults };
};

export default useProductSearchResultsData;
