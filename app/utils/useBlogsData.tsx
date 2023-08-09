import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useBlogsData = () => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogs`;

  const { data: blogs, mutate: mutateBlogs } = useSWR(
    "blogs",
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateBlogs();
  }, [mutateBlogs]);

  return { blogs };
};

export default useBlogsData;
