/**
 * Format date nicely
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Sort pinned notes first
 */
export const sortNotes = (notes) => {
  return [...notes].sort((a, b) => b.isPinned - a.isPinned);
};

/**
 * Truncate long text
 */
export const truncate = (text, length = 100) => {
  if (!text) return "";
  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

/**
 * Simple class join utility
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};