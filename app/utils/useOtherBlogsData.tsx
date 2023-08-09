import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useOtherBlogsData = (blogId: number) => {
  let url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}otherBlogs?blogIdQuery=${blogId}`;

  const { data: otherBlogs, mutate: mutateOtherBlogs } = useSWR(
    [url, blogId, blogId],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateOtherBlogs();
  }, [mutateOtherBlogs]);

  return { otherBlogs };
};

export default useOtherBlogsData;
