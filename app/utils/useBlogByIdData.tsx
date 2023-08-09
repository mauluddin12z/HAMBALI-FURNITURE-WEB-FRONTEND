import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useBlogByIdData = (blogId: number) => {
  let url: string = "";
  if (blogId > 0) {
    url = url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blog/${blogId}`;
  }

  const { data: blogById, mutate: mutateBlogById } = useSWR(
    [url, blogId],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateBlogById();
  }, [mutateBlogById]);

  return { blogById };
};

export default useBlogByIdData;
