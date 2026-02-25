import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiArchive, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";

const Sidebar = ({ isOpen, onClose }) => {
  const navItem =
    "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition";

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 space-y-2 mt-16 md:mt-0">

          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                navItem,
                isActive
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )
            }
          >
            <FiHome size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/archive"
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                navItem,
                isActive
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )
            }
          >
            <FiArchive size={18} />
            Archive
          </NavLink>

          <NavLink
            to="/trash"
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                navItem,
                isActive
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              )
            }
          >
            <FiTrash2 size={18} />
            Trash
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
