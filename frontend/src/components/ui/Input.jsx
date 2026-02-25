import React, { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={clsx(
            "w-full rounded-xl border px-4 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100",
            "border-gray-300 dark:border-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;