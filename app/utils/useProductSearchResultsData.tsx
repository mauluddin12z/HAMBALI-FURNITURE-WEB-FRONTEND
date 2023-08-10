import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useProductSearchResultsData = (filter: any) => {
  let urlProductsSearchResult = `${
    process.env.NEXT_PUBLIC_MY_BACKEND_URL
  }filteredProducts?start=${filter.start ? filter.start : 0}&limit=${
    filter.limit ? filter.limit : 6
  }`;
  let urlTotalProductsSearchResult = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredProducts?`;
  if (filter.searchQuery?.length > 0) {
    urlProductsSearchResult += `&searchQuery=${filter.searchQuery}`;
    urlTotalProductsSearchResult += `?searchQuery=${filter.searchQuery}`;
  }

  const { data: productSearchResults, mutate: mutateProducts } = useSWR(
    [
      "products",
      urlProductsSearchResult,
      filter.start,
      filter.limit,
      filter.searchQuery,
    ],
    () => fetcher(`${urlProductsSearchResult}`),
    {
      revalidateOnMount: filter.revalidate ? filter.revalidate : false,
      refreshInterval: filter.revalidate ? 1000 : 0,
    }
  );

  const { data: totalProductSearchResults, mutate: mutateTotalProducts } =
    useSWR(
      ["products", urlTotalProductsSearchResult, filter.searchQuery],
      () => fetcher(`${urlTotalProductsSearchResult}`),
      {
        revalidateOnMount: filter.revalidate ? filter.revalidate : false,
        refreshInterval: filter.revalidate ? 1000 : 0,
      }
    );

  useEffect(() => {
    mutateProducts();
    mutateTotalProducts();
  }, [
    mutateProducts,
    mutateTotalProducts,
    filter.start,
    filter.limit,
    filter.searchQuery,
  ]);

  return { productSearchResults, totalProductSearchResults };
};

export default useProductSearchResultsData;
