import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useFilteredBlogsData = (filter: any) => {
  let urlBlogs = `${
    process.env.NEXT_PUBLIC_MY_BACKEND_URL
  }filteredBlogs?start=${filter.start ? filter.start : 0}&limit=${
    filter.limit ? filter.limit : 6
  }`;
  let urlTotalBlogs = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}filteredBlogs`;

  if (filter.searchQuery?.length > 0) {
    urlBlogs += `&searchQuery=${filter.searchQuery}`;
    urlTotalBlogs += `?searchQuery=${filter.searchQuery}`;
  }

  const { data: filteredBlogs, mutate: mutateBlogs } = useSWR(
    ["blogs", urlBlogs, filter.start, filter.limit],
    () => fetcher(`${urlBlogs}`),
    {
      revalidateOnMount: filter.revalidate ? filter.revalidate : false,
      refreshInterval: filter.revalidate ? 1000 : 0,
    }
  );
  const { data: totalFilteredBlogs, mutate: mutateTotalBlogs } = useSWR(
    ["blogs", urlTotalBlogs],
    () => fetcher(`${urlTotalBlogs}`),
    {
      revalidateOnMount: filter.revalidate ? filter.revalidate : false,
      refreshInterval: filter.revalidate ? 1000 : 0,
    }
  );

  useEffect(() => {
    mutateBlogs();
    mutateTotalBlogs();
  }, [
    filter.start,
    filter.limit,
    filter.searchQuery,
    mutateTotalBlogs,
    mutateBlogs,
  ]);

  return { filteredBlogs, totalFilteredBlogs };
};

export default useFilteredBlogsData;
