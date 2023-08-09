import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useCategoryByIdData = (categoryId: number) => {
  let url: string = "";

  if (categoryId > 0) {
    url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}category/${categoryId}`;
  }
  const { data: categoryById, mutate: mutateCategoryById } = useSWR(
    [url, categoryId],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateCategoryById();
  }, [mutateCategoryById]);

  return { categoryById };
};

export default useCategoryByIdData;
