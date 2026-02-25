import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={clsx(
          "relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 animate-fadeIn",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;