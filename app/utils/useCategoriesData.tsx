import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useCategoriesData = () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category`;

  const { data: categories, mutate: mutateCategories } = useSWR(
    ["categories", url],
    () => fetcher(`${url}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );

  useEffect(() => {
    mutateCategories();
  }, [mutateCategories]);

  return { categories };
};

export default useCategoriesData;
