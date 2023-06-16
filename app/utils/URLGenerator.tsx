import React from "react";

export default function URLGenerator(data: string) {
  return encodeURIComponent(data?.toLowerCase().replace(/\s+/g, "-"));
}
