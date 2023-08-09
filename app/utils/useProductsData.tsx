import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useProductsData = () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products`;

  const { data: products, mutate: mutateProducts } = useSWR(
    url,
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateProducts();
  }, [mutateProducts]);

  return { products };
};

export default useProductsData;
