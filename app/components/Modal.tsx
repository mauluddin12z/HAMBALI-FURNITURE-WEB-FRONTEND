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
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-30"
      onClick={handleClose}
    >
      <div className="w-[600px] bg-white p-4 rounded flex flex-col">
        <button
          className="text-gray-600 hover:text-black text-xl place-self-end text-[32px]"
          onClick={() => onClose()}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
