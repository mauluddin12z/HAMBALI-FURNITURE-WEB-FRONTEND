import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useFilteredCategoriesData = (filter: any) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredCategorsy?start=${
    filter.start ? filter.start : 0
  }&limit=${filter.limit ? filter.limit : 6}`;
  if (filter.searchQuery?.length > 0) {
    url += `&searchQuery=${filter?.searchQuery}`;
  }
  const { data: filteredCategories, mutate: mutateCategories } = useSWR(
    ["categories", url, filter?.start, filter?.limit],
    () => fetcher(`${url}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );

  useEffect(() => {
    mutateCategories();
  }, [filter?.start, filter?.limit, mutateCategories]);

  return { filteredCategories };
};

export default useFilteredCategoriesData;
