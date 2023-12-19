"use client";
import React, { useEffect, useState } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import Image, { ImageLoader } from "next/image";
import ImageModal from "../components/ImageModal";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import MainLayout from "../components/MainLayout";
import useBlogsData from "../utils/useBlogsData";
import useTotalBlogImages from "../utils/useTotalBlogImagesData";
import useBlogImageByIdData from "../utils/useBlogImageByIdData";
import BreadcrumbNavigation from "../components/breadcrumbNavigation";

export default function Page() {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const [limit, setLimit] = useState(12);
  const [loadMoreDataIsLoading, setLoadMoreDataIsLoading] = useState(false);
  let { blogs } = useBlogsData();
  const { totalBlogImages } = useTotalBlogImages();
  const [limitThreshold, setLimitThreshold] = useState(
    limit >= totalBlogImages?.length
  );

  blogs = blogs?.slice(0, limit);

  useEffect(() => {
    setLimitThreshold(limit >= totalBlogImages?.length);
  }, [limit, totalBlogImages?.length]);

  const handleLoadMore = async () => {
    setLoadMoreDataIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setLimit((prev) => prev + 4);

    setLoadMoreDataIsLoading(false);
  };

  const [cardIsHovered, setCardIsHovered] = useState(-1);

  const handleOutsideLayerHover = (blogImage_id: number) => {
    setCardIsHovered(blogImage_id);
  };

  const handleOutsideLayerLeave = () => {
    setCardIsHovered(-1);
  };

  const [showModal, setShowModal] = useState(false);
  const [blogImageId, setBlogImageId] = useState(0);
  const [isZoom, setIsZoom] = useState(false);

  const { blogImageById } = useBlogImageByIdData(blogImageId);
  const renderItems = [];
  for (let i = 0; i < 8; i++) {
    renderItems.push(
      <div key={i} className="h-[300px]">
        <SkeletonLoading />
      </div>
    );
  }

  const breadcrumbNavigationItem = {
    pathHistory: [
      {
        pathname: "Home",
        link: "/",
      },
    ],
    currentPath: {
      pathname: "Gallery",
    },
  };

  return (
    <MainLayout>
      <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-6xl min-h-screen mx-auto 2xl:px-0 xl:px-4 px-2 mt-44">
        <div className="flex flex-col justify-center items-center">
          <BreadcrumbNavigation
            breadcrumbNavigationItem={breadcrumbNavigationItem}
          />
          <div className="flex lg:justify-start justify-between items-center w-full mb-8">
            <div className="font-semibold lg:text-[36px] text-[28px]">
              Gallery
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-between">
            <div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-2 mb-10">
              {blogs ? (
                blogs?.map((blogs: any) =>
                  blogs?.blog_images?.map((blogImages: any) => (
                    <div
                      key={blogImages.blogImage_id}
                      className="flex flex-col relative overflow-hidden"
                    >
                      <div
                        className="relative w-full h-[300px] overflow-hidden z-20 flex justify-center items-center hover:opacity-90 hover:cursor-pointer"
                        onClick={() => {
                          setShowModal(true);
                          setBlogImageId(blogImages?.blogImage_id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setShowModal(true);
                          }
                        }}
                        onMouseEnter={() =>
                          handleOutsideLayerHover(blogImages?.blogImage_id)
                        }
                        onMouseLeave={handleOutsideLayerLeave}
                      >
                        <div
                          className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
                        ></div>
                        <Image
                          className={`absolute w-full h-full object-cover`}
                          loader={myLoader}
                          src={blogImages?.imageUrl}
                          width={500}
                          height={500}
                          alt={"blogImages" + blogImages?.blogImage_id}
                        />
                        <Image
                          className={`object-contain w-full h-full z-20 transition-transform duration-500`}
                          loader={myLoader}
                          src={blogImages?.imageUrl}
                          width={500}
                          height={500}
                          alt={"blogImages" + blogImages?.blogImage_id}
                        />
                      </div>
                      <div
                        className={`lg:block hidden z-[60] absolute bottom-0 w-full py-3 bg-black/80 transition-all ${
                          cardIsHovered === blogImages?.blogImage_id
                            ? ""
                            : "translate-y-[100%] opacity-0"
                        }`}
                        onMouseEnter={() =>
                          handleOutsideLayerHover(blogImages?.blogImage_id)
                        }
                        onMouseLeave={handleOutsideLayerLeave}
                      >
                        <div className="text-[14px] text-gray-300 text-center">
                          {blogImages?.createdAt &&
                            format(
                              new Date(blogImages?.createdAt),
                              "EEEE, d MMMM yyyy HH:mm 'WIB'",
                              {
                                locale: id,
                              }
                            )}
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <>{renderItems}</>
              )}
            </div>
            {!loadMoreDataIsLoading && (
              <button
                type="button"
                className={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium ${
                  limit >= totalBlogImages?.length
                    ? "text-gray-400"
                    : "text-gray-900 hover:text-blue-700"
                } bg-white rounded-lg border border-gray-200 hover:bg-gray-100`}
                onClick={() => handleLoadMore()}
                disabled={limitThreshold}
              >
                Load More
              </button>
            )}
            {loadMoreDataIsLoading && (
              <div className="rounded-lg flex items-center flex-col">
                <div className="loader-dots block relative w-20 h-5 mt-2">
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                  <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-primary-color"></div>
                </div>
                <div className="text-gray-500 text-xs font-light mt-2 text-center">
                  Please wait...
                </div>
              </div>
            )}
          </div>
        </div>
        <ImageModal
          setIsVisible={setShowModal}
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          setIsZoom={setIsZoom}
        >
          <div className="h-[80%] w-[80%] flex justify-center items-center">
            {blogImageById && (
              <div className="flex flex-col justify-center items-center gap-8">
                <div className="text-[16px] text-white text-center">
                  {blogImageById?.createdAt &&
                    format(
                      new Date(blogImageById?.createdAt),
                      "EEEE, d MMMM yyyy HH:mm 'WIB'",
                      {
                        locale: id,
                      }
                    )}
                </div>
                <Image
                  className={`object-contain w-auto h-full z-20 transition-transform duration-200 ${
                    isZoom
                      ? "scale-150 cursor-zoom-out"
                      : "scale-100 cursor-zoom-in"
                  }`}
                  loader={myLoader}
                  src={blogImageById?.imageUrl}
                  width={500}
                  height={500}
                  alt={"blogImages" + blogImageById?.blogImage_id}
                  onClick={() => setIsZoom((prev) => !prev)}
                />
              </div>
            )}
          </div>
        </ImageModal>
      </div>
    </MainLayout>
  );
}
