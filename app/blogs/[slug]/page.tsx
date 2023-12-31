"use client";
import React, { useEffect, useState } from "react";
import URLToStringGenerator from "@/app/utils/URLToStringGenerator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import OtherBlogs from "./otherBlogs";
import BlogImageSwiper from "../../components/BlogImageSwiper";
import Loading from "@/app/components/Loading";
import MainLayout from "@/app/components/MainLayout";
import useBlogByTitle from "@/app/utils/useBlogByTitleData";
import BreadcrumbNavigation from "@/app/components/breadcrumbNavigation";

export default function Page({ params }: { params: { slug: string } }) {
  const [titleQuery, setTitleQuery] = useState(
    URLToStringGenerator(params.slug)
  );
  const { blogByTitle } = useBlogByTitle(titleQuery);

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  const breadcrumbNavigationItem = {
    pathHistory: [
      {
        pathname: "Home",
        link: "/",
      },
      {
        pathname: "Blogs",
        link: "/",
      },
    ],
    currentPath: {
      pathname: blogByTitle?.title,
    },
  };

  if (!blogByTitle) return <Loading />;
  return (
    <MainLayout>
      <div className="max-w-7xl min-h-screen mx-auto 2xl:px-0 xl:px-4 px-2 mt-44">
        <div className="flex flex-col w-full">
          <BreadcrumbNavigation
            breadcrumbNavigationItem={breadcrumbNavigationItem}
          />
          <div className="flex flex-col gap-10 mt-10">
            <div className="flex flex-col w-full">
              <div className="font-bold text-[30px]">{blogByTitle?.title}</div>
              <div className="mt-2 mb-2 text-[16px] text-gray-500">
                {format(
                  new Date(blogByTitle?.createdAt),
                  "EEEE, d MMMM yyyy HH:mm 'WIB'",
                  {
                    locale: id,
                  }
                )}
              </div>
              {blogByTitle ? (
                <>
                  {blogByTitle.blog_images && (
                    <BlogImageSwiper data={blogByTitle} />
                  )}
                  <div
                    className="text-gray-600 mt-10 flex flex-col description"
                    dangerouslySetInnerHTML={{
                      __html: blogByTitle?.description,
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="w-full h-[400px] mb-2">
                    <SkeletonLoading />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 mb-2 gap-4">
                    <div className="h-[200px]">
                      <SkeletonLoading />
                    </div>
                    <div className="h-[200px]">
                      <SkeletonLoading />
                    </div>
                    <div className="h-[200px] lg:block hidden">
                      <SkeletonLoading />
                    </div>
                    <div className="h-[200px] lg:block hidden">
                      <SkeletonLoading />
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-col">
                <div className="font-semibold text-[24px] mt-10">Share:</div>
                <div className="flex gap-x-4">
                  <Link
                    aria-label="whatsapp"
                    href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                    target="_blank"
                    className="font-bold text-[24px] text-green-600 hover:text-green-800 transition-colors"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </Link>
                  <Link
                    aria-label="facebook"
                    href={`https://www.facebook.com/share.php?u=${currentUrl}`}
                    target="_blank"
                    className="font-bold text-[24px] text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full">
              <OtherBlogs blogId={blogByTitle?.blog_id} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
