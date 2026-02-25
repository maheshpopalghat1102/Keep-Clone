import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = ({
  onMenuClick,
  darkMode,
  setDarkMode,
  searchQuery,
  onSearchChange,
}) => {
  const navigate = useNavigate();
  const { user, logout, deleteAccount, loading } = useAuth();
  const accountInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const handleDeleteAccount = async () => {
    const shouldDelete = window.confirm(
      "Delete account permanently? This will delete all your notes."
    );
    if (!shouldDelete) return;

    try {
      await deleteAccount();
      setMenuOpen(false);
      navigate("/login", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3">
      
      <div className="flex items-center justify-between gap-2">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Open menu"
          >
            <FiMenu size={20} />
          </button>

          <h1 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
            KeepClone
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex w-8 h-8 rounded-full bg-indigo-600 items-center justify-center text-white text-sm font-semibold"
              aria-label="Open account menu"
              aria-expanded={menuOpen}
            >
              {accountInitial}
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-1 z-50">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-60"
                >
                  {loading ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mt-3">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </header>
  );
};

export default Navbar;
