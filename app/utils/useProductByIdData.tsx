import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useProductByIdData = (id: number) => {
  let url: string = "";
  if (id > 0) {
    url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}product/${id}`;
  }

  const { data: productById, mutate: mutateProductById } = useSWR(
    [url, id],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateProductById();
  }, [mutateProductById]);

  return { productById };
};

export default useProductByIdData;
