"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_MY_BACKEND_URL + "token",
        {
          withCredentials: true,
        }
      );
      setToken(response.data.accessToken);
      const decoded: any = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      setUserId(decoded.userId);
      setIsUserLoggedIn(true);
    } catch (error: any) {
      if (error.response) {
        router.push("/administrator/login");
      }
    }
  }, [router]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_MY_BACKEND_URL + "token",
            {
              withCredentials: true,
            }
          );
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded: any = jwt_decode(response.data.accessToken);
          setExpire(decoded.exp);
        } catch (error) {
          console.error(error);
          router.push("/administrator/login");
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUserById = async (userId: number) => {
    const res = await axiosJWT.get(
      `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  const { data: userById } = useSWR(userId ? ["userById", userId] : null, () =>
    getUserById(userId)
  );


  return { axiosJWT, refreshToken, token, isUserLoggedIn };
}
