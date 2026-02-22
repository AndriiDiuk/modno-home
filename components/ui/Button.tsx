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
    light:
      "bg-transparent text-black border-black hover:bg-black hover:text-white",
    dark: "bg-transparent text-white border-white hover:bg-white hover:text-black",
  };

  // Size styles
  const sizes = {
    sm: "px-4 py-3 text-base",
    md: "px-8 py-3 text-[14px]",
    lg: "px-10 py-3 text-[20px]",
  };

  const baseStyles =
    "inline-flex items-center justify-center rounded-[8px] w-full border transition-all duration-300 font-medium   cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

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
