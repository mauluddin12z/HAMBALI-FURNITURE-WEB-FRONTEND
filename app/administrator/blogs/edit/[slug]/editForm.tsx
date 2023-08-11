"use client";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "@/app/utils/useAuth";
import Alerts from "@/app/components/alerts";
import InputField from "@/app/components/inputField";
import TextEditor from "@/app/components/textEditor";
import useBlogByIdData from "@/app/utils/useBlogByIdData";
import InputMultipleImages from "@/app/components/inputMultipleImages";

export default function EditForm({ slug }: any) {
  const [blogId, setBlogId] = useState(Number(slug));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const { axiosJWT, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    textColor: "",
    bgColor: "",
    bgColorHover: "",
  });

  const { blogById } = useBlogByIdData(blogId);
  useEffect(() => {
    if (blogById) {
      setTitle(blogById?.title);
      setDescription(blogById?.description);
      const imageUrl = blogById?.blog_images.map(
        (image: any) => image.imageUrl
      );
      setPreview(imageUrl);
    }
  }, [blogById]);

  const alertTimeoutRef = useRef<any>(null);
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    for (const imgs of image) {
      formData.append("image", imgs);
    }
    formData.append("title", title);
    formData.append("description", description);

    setIsLoading(true);
    try {
      const { data } = await axiosJWT.patch(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blog/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      window.scrollTo(0, 0);

      // HandleSuccessAlert
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
      setShowAlert(false);
      setTimeout(() => {
        setAlert({
          message: data.msg,
          textColor: "text-white",
          bgColor: "bg-green-700",
          bgColorHover: "hover:bg-green-800",
        });
        setShowAlert(true);
      }, 100);

      alertTimeoutRef.current = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setIsLoading(false);
    } catch (error: any) {
      window.scrollTo(0, 0);
      // HandleErrorAlert
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
      setShowAlert(false);
      setTimeout(() => {
        setAlert({
          message: error.response
            ? error.response.data.msg
            : "Error updating data, please try again later.",
          textColor: "text-white",
          bgColor: "bg-red-700",
          bgColorHover: "hover:bg-red-800",
        });
        setShowAlert(true);
      }, 100);

      alertTimeoutRef.current = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full py-4 mb-4">
        <Alerts
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          message={alert.message}
          textColor={alert.textColor}
          bgColor={alert.bgColor}
          bgColorHover={alert.bgColorHover}
        />
      </div>
      <form onSubmit={handleEdit}>
        <div className="grid gap-4">
          <div className="col-span-2">
            <InputMultipleImages
              setImage={setImage}
              setPreview={setPreview}
              isRequired={false}
              preview={preview}
            />
          </div>
          <div className="w-full col-span-2">
            <InputField
              idFor="blogTitle"
              label="Blog Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
              isRequired={true}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <TextEditor
                value={description}
                onChange={(description: string) => setDescription(description)}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write description about the blog.
            </p>
          </div>
        </div>
        <div className="col-span-full flex justify-end mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Loading..." : "Edit Blog"}
          </button>
        </div>
      </form>
    </>
  );
}
