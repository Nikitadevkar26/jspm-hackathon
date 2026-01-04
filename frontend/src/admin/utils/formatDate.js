/**
 * Format a date into a readable string
 * @param {string | Date} dateInput - Date object or date string
 * @param {Object} options - Optional formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput, options = {}) {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  // Default format: DD MMM YYYY
  const defaultOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formatOptions = { ...defaultOptions, ...options };

  return date.toLocaleDateString("en-US", formatOptions);
}
