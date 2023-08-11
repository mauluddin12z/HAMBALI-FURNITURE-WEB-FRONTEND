"use client";
import React, { useRef, useState } from "react";
import useAuth from "@/app/utils/useAuth";
import Alerts from "@/app/components/alerts";
import InputField from "@/app/components/inputField";
import TextEditor from "@/app/components/textEditor";
import InputMultipleImages from "@/app/components/inputMultipleImages";

export default function AddForm() {
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

  const alertTimeoutRef = useRef<any>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    for (const imgs of image) {
      formData.append("image", imgs);
    }
    formData.append("title", title);
    formData.append("description", description);

    setIsLoading(true);
    try {
      const { data } = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      setTitle("");
      setDescription("");
      setImage([]);
      setPreview([]);
      const imageInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      if (imageInput) {
        imageInput.value = "";
      }
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
      }, 5000);
      setIsLoading(false);
    } catch (error: any) {
      // HandleErrorAlert
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
      setShowAlert(false);
      setTimeout(() => {
        setAlert({
          message: error.response
            ? error.response.data.msg
            : "Error submitting data, please try again later.",
          textColor: "text-white",
          bgColor: "bg-red-700",
          bgColorHover: "hover:bg-red-800",
        });
        setShowAlert(true);
      }, 100);

      alertTimeoutRef.current = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
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
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="col-span-2">
            <InputMultipleImages
              setImage={setImage}
              setPreview={setPreview}
              isRequired={true}
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
            className="place- text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Loading..." : "Add Blog"}
          </button>
        </div>
      </form>
    </>
  );
}
