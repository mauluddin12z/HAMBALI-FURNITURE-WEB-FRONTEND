"use client";
import React, { useEffect } from "react";

export default function Modal({
  isVisible,
  onClose,
  children,
  setIsZoom,
}: any) {
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[90] w-full h-screen"
      onClick={handleClose}
    >
      <button
        className="text-white hover:text-gray-200 transition-all text-[32px] fixed z-[60] top-0 right-0 flex w-20 h-20 justify-center items-center"
        onClick={() => {
          onClose();
          setIsZoom(false);
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="overflow-y-scroll lg:overflow-hidden z-30 h-full w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
