import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useProductByNameData = (productNameQuery: string) => {
  let url: string = "";
  if (productNameQuery !== "") {
    url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}productByName?productNameQuery=${productNameQuery}`;
  }

  const { data: productByName, mutate: mutateProductByName } = useSWR(
    [url, productNameQuery],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateProductByName();
  }, [mutateProductByName]);

  return { productByName };
};

export default useProductByNameData;
