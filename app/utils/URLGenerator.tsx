export default function URLGenerator(data: string) {
  const cleanedStr = data?.replace(/[^a-zA-Z0-9\s]/g, "");

  const lowercaseStr = cleanedStr?.toLowerCase();

  const url = encodeURIComponent(lowercaseStr?.replace(/\s+/g, "-"));

  return url;
}
