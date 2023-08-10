"use client";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "@/app/utils/useAuth";
import Alerts from "@/app/components/alerts";
import InputField from "@/app/components/inputField";
import InputPasswordField from "@/app/components/inputUsernamePasswordField";
import useUserByIdData from "@/app/utils/useUserByIdData";
import InputUsernamePasswordField from "@/app/components/inputUsernamePasswordField";

export default function EditForm({ slug }: any) {
  const [userId, setUserId] = useState(Number(slug));
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { axiosJWT, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    textColor: "",
    bgColor: "",
    bgColorHover: "",
  });

  const { userById } = useUserByIdData(userId);
  useEffect(() => {
    if (userById) {
      setName(userById?.name);
      setUsername(userById?.username);
      setPassword(userById?.password);
      setConfirmPassword(userById?.password);
    }
  }, [userById]);

  const alertTimeoutRef = useRef<any>(null);
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    setIsLoading(true);
    try {
      const { data } = await axiosJWT.patch(
        `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}users/${userId}`,
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
          <div className="w-full">
            <InputField
              idFor="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              isRequired={true}
            />
          </div>
          <div className="w-full">
            <InputUsernamePasswordField
              idFor="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              isRequired={true}
              autocomplete="username"
            />
          </div>
          <div className="w-full">
            <InputUsernamePasswordField
              idFor="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              isRequired={true}
              autocomplete="new-password"
            />
          </div>
          <div className="w-full">
            <InputUsernamePasswordField
              idFor="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••"
              isRequired={true}
              autocomplete="new-password"
            />
          </div>
        </div>
        <div className="col-span-full flex justify-end mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            {isLoading ? "Loading..." : "Edit User"}
          </button>
        </div>
      </form>
    </>
  );
}
