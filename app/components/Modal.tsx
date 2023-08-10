"use client";
import React, { useEffect } from "react";

export default function Modal({ isVisible, onClose, children }: any) {
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isVisible]);
  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-[999] w-full h-screen"
      onClick={handleClose}
    >
      <div className="xl:w-[40%] lg:w-[60%] md:w-[80%] w-[90%] h-auto max-h-[80%] bg-white rounded flex flex-col p-4 overflow-hidden">
        <button
          className="text-gray-600 hover:text-black place-self-end text-[22px] fixed z-40"
          onClick={() => onClose()}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="overflow-y-auto lg:overflow-hidden z-30 h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
