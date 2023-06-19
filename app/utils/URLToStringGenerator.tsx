import React from "react";

export default function URLToStringGenerator(data: string) {
  return data?.replace(/-/g, " ");
}
