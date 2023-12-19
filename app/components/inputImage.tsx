import React from "react";
import Image, { ImageLoader } from "next/image";

interface InputImageProps {
  setImage: any;
  setPreview: any;
  isRequired: boolean;
  preview: string;
}

export default function inputImage({
  setImage,
  setPreview,
  isRequired,
  preview,
}: InputImageProps) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const loadImage = (e: any) => {
    const selectedImages = e.target.files[0];
    if (selectedImages) {
      setImage(selectedImages);
      setPreview(URL.createObjectURL(selectedImages));
    }
  };

  return (
    <>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        id="file_input"
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:cursor-pointer file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        type="file"
        accept="image/*"
        onChange={loadImage}
        required={isRequired}
      />
      {preview && (
        <div className="my-6">
          <Image
            loader={myLoader}
            width={100}
            height={100}
            src={preview}
            alt="Image Preview"
            className="w-[200px] h-auto"
          />
        </div>
      )}
    </>
  );
}
