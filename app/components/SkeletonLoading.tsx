import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";

export default function SkeletonLoading() {
  return <Skeleton baseColor="#E9EEFF" className="h-full w-full -translate-y-1" />;
}
