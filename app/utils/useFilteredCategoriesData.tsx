import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useFilteredCategoriesData = (filter: any) => {
  let urlCategories = `${
    process.env.NEXT_PUBLIC_MY_BACKEND_URL
  }filteredCategory?start=${filter.start ? filter.start : 0}&limit=${
    filter.limit ? filter.limit : 6
  }`;
  let urlTotalCategories = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredCategory`;

  if (filter.searchQuery?.length > 0) {
    urlCategories += `&searchQuery=${filter?.searchQuery}`;
    urlTotalCategories += `?searchQuery=${filter?.searchQuery}`;
  }
  const { data: filteredCategories, mutate: mutateCategories } = useSWR(
    ["categories", urlCategories, filter?.start, filter?.limit],
    () => fetcher(`${urlCategories}`),
    {
      revalidateOnMount: filter.revalidate ? filter.revalidate : false,
      refreshInterval: filter.revalidate ? 1000 : 0,
    }
  );
  const { data: totalFilteredCategories, mutate: mutateTotalCategories } =
    useSWR(
      ["categories", urlTotalCategories, filter?.start, filter?.limit],
      () => fetcher(`${urlTotalCategories}`),
      {
        revalidateOnMount: filter.revalidate ? filter.revalidate : false,
        refreshInterval: filter.revalidate ? 1000 : 0,
      }
    );

  useEffect(() => {
    mutateCategories();
    mutateTotalCategories();
  }, [filter?.start, filter?.limit, mutateCategories, mutateTotalCategories]);

  return { filteredCategories, totalFilteredCategories };
};

export default useFilteredCategoriesData;
