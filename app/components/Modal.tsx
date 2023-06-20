"use client";
import React, { useEffect } from "react";

export default function Modal({ isVisible, onClose, children }: any) {
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-30 lg:mt-0 mt-20"
      onClick={handleClose}
    >
      <div className="lg:w-[600px] w-[350px] h-[470px] lg:h-auto bg-white rounded flex flex-col p-4 overflow-hidden">
        <button
          className="text-gray-600 hover:text-black text-xl place-self-end text-[32px] fixed z-40"
          onClick={() => onClose()}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="overflow-y-scroll lg:overflow-hidden z-30">{children}</div>
      </div>
    </div>
  );
}
