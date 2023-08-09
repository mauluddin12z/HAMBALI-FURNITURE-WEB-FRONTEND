import { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useBlogByTitle = (blogTitleQuery: string) => {
  let url: string = "";
  if (blogTitleQuery !== "") {
    url = `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blogByTitle?blogTitleQuery=${blogTitleQuery}`;
  }

  const { data: blogByTitle, mutate: mutateBlogByTitle } = useSWR(
    [url, blogTitleQuery],
    () => fetcher(`${url}`),
    { revalidateOnMount: true }
  );

  useEffect(() => {
    mutateBlogByTitle();
  }, [mutateBlogByTitle]);

  return { blogByTitle };
};

export default useBlogByTitle;
