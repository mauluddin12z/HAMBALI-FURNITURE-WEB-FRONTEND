import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useTotalBlogImages = () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogImages`;
  const { data: totalBlogImages, mutate: mutateTotalBlogImages } = useSWR(
    ["blogs", url],
    () => fetcher(`${url}`),
    { revalidateOnMount: true, refreshInterval: 1000 }
  );
  useEffect(() => {
    mutateTotalBlogImages();
  }, [mutateTotalBlogImages]);

  return { totalBlogImages };
};

export default useTotalBlogImages;
