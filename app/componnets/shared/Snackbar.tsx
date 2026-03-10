import React, { useEffect } from "react";

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
  duration?: number;
  type?: "error" | "success" | "info";
}

const Snackbar: React.FC<SnackbarProps> = ({ message, open, onClose, duration = 4000, type = "error" }) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  let bgColor = "bg-red-600";
  if (type === "success") bgColor = "bg-green-600";
  if (type === "info") bgColor = "bg-blue-600";

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold ${bgColor}`}
      style={{ minWidth: 240, maxWidth: 400 }}
      role="alert"
    >
      {message}
      <button
        className="ml-4 text-white font-bold focus:outline-none"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default Snackbar;
