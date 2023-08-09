import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useBlogImageByIdData = (id: number) => {
  let url: string = "";
  if (id > 0) {
    url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogImages/${id}`;
  }
  const { data: blogImageById, mutate: mutateBlogImageById } = useSWR(
    [url, id],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateBlogImageById();
  }, [mutateBlogImageById]);

  return { blogImageById };
};

export default useBlogImageByIdData;
