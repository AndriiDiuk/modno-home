import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

/**
 * Reusable Button component with light/dark variants and three sizes.
 * Follows the pill-shaped design with a border.
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "light",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
}) => {
  // Variant styles
  const variants = {
    light: "bg-white text-black border-black hover:bg-black hover:text-white",
    dark: "bg-black text-white border-white hover:bg-white hover:text-black",
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-12 py-5 text-base",
  };

  const baseStyles =
    "inline-flex items-center justify-center rounded-full border transition-all duration-300 font-medium uppercase tracking-widest cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {label}
    </button>
  );
};
