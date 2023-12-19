import React from "react";
import Image, { ImageLoader } from "next/image";

interface InputMultipleImagesProps {
  setImage: any;
  setPreview: any;
  isRequired: boolean;
  preview: string[];
}

export default function InputImage({
  setImage,
  setPreview,
  isRequired,
  preview,
}: InputMultipleImagesProps) {
  const myLoader: ImageLoader = ({ src }) => {
    return process.env.NEXT_PUBLIC_MY_BACKEND_URL + src;
  };

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;

    if (selectedImages) {
      setImage(Array.from(selectedImages));

      const previewURLs = Array.from(selectedImages).map((image: File) =>
        URL.createObjectURL(image)
      );
      setPreview(previewURLs);
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
        multiple
      />
      {preview.length > 0 && (
        <div className="my-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1">
          {preview.map((imageUrl, index) => (
            <div
              key={index}
              className="aspect-square flex justify-center items-center overflow-hidden cursor-pointer relative"
            >
              <div
                className={`bg-black/50 backdrop-blur-md w-full h-full absolute z-10`}
              ></div>
              <Image
                className={`absolute w-full h-full`}
                loader={myLoader}
                src={imageUrl}
                width={500}
                height={500}
                alt={`Image Preview ${index + 1}`}
              />
              <Image
                className={`object-contain z-[20] h-full transition-transform duration-500`}
                loader={myLoader}
                src={imageUrl}
                width={500}
                height={500}
                alt={`Image Preview ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
