"use client";
import React, { useEffect } from "react";

export default function Modal({
  isVisible,
  onClose,
  children,
  setIsZoom,
}: any) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVisible && e.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.body.classList.add("modal-open");
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") {
      onClose();
      setIsZoom(false);
    }
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[90] w-full h-screen"
      onClick={handleClose}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClose(e);
        }
      }}
    >
      <div className="h-auto flex flex-col">
        <button
          className="text-white hover:text-gray-200 transition-all text-[32px] fixed z-[60] top-0 right-0 flex w-20 h-20 justify-center items-center"
          onClick={() => {
            onClose();
            setIsZoom(false);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="z-30 h-screen w-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
