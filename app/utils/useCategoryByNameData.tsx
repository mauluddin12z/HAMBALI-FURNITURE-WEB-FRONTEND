import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useCategoryByNameData = (categoryName: string) => {
  let url: string = "";
  if (categoryName !== "") {
    url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}categoryByName`;
  }
  if (categoryName !== "") {
    url += `?categoryQuery=${categoryName}`;
  }

  const { data: categoryByName, mutate: mutateCategoryByName } = useSWR(
    [url, categoryName],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateCategoryByName();
  }, [mutateCategoryByName]);

  return { categoryByName };
};

export default useCategoryByNameData;
