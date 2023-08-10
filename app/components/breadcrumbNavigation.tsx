import Link from "next/link";
import React from "react";

export default function breadcrumbNavigation({
  breadcrumbNavigationItem,
}: {
  breadcrumbNavigationItem: any;
}) {
  return (
    <div className="flex w-full gap-x-6 mb-10 items-center lg:justify-start justify-center rounded-lg py-10 text-[14px] lg:text-[16px]">
      {breadcrumbNavigationItem &&
        breadcrumbNavigationItem.pathHistory.map(
          (pathname: any, index: number) => (
            <React.Fragment key={index}>
              <Link
                href={pathname.link}
                className="text-gray-400 hover:text-gray-900 transition-all"
              >
                {pathname.pathname}
              </Link>
              <div className="text-gray-400 text-[12px]">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </React.Fragment>
          )
        )}
      <div className="text-gray-900">
        {breadcrumbNavigationItem.currentPath.pathname}
      </div>
    </div>
  );
}
