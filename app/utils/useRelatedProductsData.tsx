import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useRelatedProductsData = (
  categoryQuery: number,
  productNameQuery: string
) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}relatedProducts?categoryQuery=${categoryQuery}&productNameQuery=${productNameQuery}`;

  const { data: relatedProducts, mutate: mutateRelatedProducts } = useSWR(
    [url, categoryQuery, productNameQuery],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateRelatedProducts();
  }, [mutateRelatedProducts]);

  return { relatedProducts };
};

export default useRelatedProductsData;
