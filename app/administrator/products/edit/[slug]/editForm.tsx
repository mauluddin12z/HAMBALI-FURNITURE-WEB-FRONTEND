"use client";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "@/app/utils/useAuth";
import Alerts from "@/app/components/alerts";
import InputField from "@/app/components/inputField";
import TextEditor from "@/app/components/textEditor";
import InputImage from "@/app/components/inputImage";
import useProductByIdData from "@/app/utils/useProductByIdData";
import useCategoriesData from "@/app/utils/useCategoriesData";

export default function EditForm({ slug }: any) {
  const [productId, setProductId] = useState(Number(slug));
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [dimensions, setDimensions] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const { axiosJWT, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    textColor: "",
    bgColor: "",
    bgColorHover: "",
  });

  const { categories } = useCategoriesData();
  const { productById } = useProductByIdData(productId);
  useEffect(() => {
    if (productById) {
      setProductName(productById?.product_name);
      setDimensions(productById?.dimensions);
      setMaterial(productById?.material);
      setColor(productById?.color);
      setDescription(productById?.description);
      setPrice(productById?.price);
      setPreview(productById?.imageUrl);
      setCategoryId(productById?.category_id);
    }
  }, [productById]);

  const alertTimeoutRef = useRef<any>(null);
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("product_name", productName);
    formData.append("dimensions", dimensions);
    formData.append("material", material);
    formData.append("color", color);

    if (price >= 0) {
      formData.append("price", price.toString());
    }

    if (categoryId > 0) {
      formData.append("category_id", categoryId.toString());
    }

    setIsLoading(true);
    try {
      const { data } = await axiosJWT.patch(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}products/${productId}`,
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
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <InputImage
              setImage={setImage}
              setPreview={setPreview}
              isRequired={false}
              preview={preview}
            />
          </div>
          <div className="w-full">
            <InputField
              idFor="productName"
              label="Product Name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product name"
              isRequired={true}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              value={categoryId > 0 ? categoryId : "default"}
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
              required
            >
              <option value="default" disabled>
                Select category
              </option>
              {categories &&
                categories?.map((categories: any, index: number) => (
                  <option key={index} value={categories.category_id}>
                    {categories.category}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-full">
            <InputField
              idFor="price"
              label="Price"
              type="number"
              value={price === 0 ? "" : price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              placeholder="Rp. 99.999"
              isRequired={false}
            />
          </div>
          <div className="w-full">
            <InputField
              idFor="dimensions"
              label="Dimensions"
              type="text"
              placeholder="W: 999cm D: 999cm H: 999 mm"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              isRequired={false}
            />
          </div>
          <div className="w-full">
            <InputField
              idFor="material"
              label="Material"
              type="text"
              placeholder="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              isRequired={false}
            />
          </div>
          <div className="w-full">
            <InputField
              idFor="color"
              label="Color"
              type="text"
              placeholder="Colors"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              isRequired={false}
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="Description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <TextEditor value={description} onChange={setDescription} />
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write description about the product.
            </p>
          </div>
        </div>
        <div className="col-span-full flex justify-end mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Loading..." : "Edit Product"}
          </button>
        </div>
      </form>
    </>
  );
}
