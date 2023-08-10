"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HambaliFurnitureLogo from "@/public/images/LogoHambaliFurniture.png";
import LoadingForButton from "@/app/components/LoadingForButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuth from "@/app/utils/useAuth";
import InputUsernamePasswordField from "@/app/components/inputUsernamePasswordField";

export default function Page() {
  const { isUserLoggedIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const Auth = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_MY_BACKEND_URL + "login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      router.push("/administrator/products");
      setIsLoading(false);
    } catch (error: any) {
      if (error.response) {
        setMsg(
          error.response
            ? error.response.data.msg
            : "Server error, please try again later."
        );
      } else {
        setMsg("Error");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/administrator/products");
    }
  }, [isUserLoggedIn, router]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen lg:py-0 p-6 bg-gray-100">
      <div className="w-full bg-white rounded-lg shadow max-w-md p-4 ">
        <div className="flex items-center justify-center">
          <Image
            src={HambaliFurnitureLogo}
            width={120}
            height={120}
            alt="logoHambaliFurnitre"
            className="w-auto h-auto"
            priority
          />
        </div>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <div className="text-center text-red-600">{msg}</div>
          <form onSubmit={Auth}>
            <div className="w-full mb-4">
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
            <div>
              <div className="w-full mb-4">
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
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="gap-x-2 flex justify-center">
                  <LoadingForButton />
                  Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
