import React from "react";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Flexible AppButton component with support for variants and sizes.
 * Created to supplement the existing Button component without modifying it.
 */
export const AppButton: React.FC<AppButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) => {
  const variants = {
    primary: "bg-[#FFDE79] hover: bg-[#FFDE79]",
    secondary:
      "bg-brand-light-gray text-brand-black hover:bg-brand-border border-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-[12px] md:text-[14px]",
    md: "px-8 py-3 text-[14px] md:text-[16px]",
    lg: "px-[22px] py-[22px] text-[14px] md:text-[18px]  ",
    xl: "px-10 py-5 text-[18px] md:text-[20px]",
  };

  const baseStyles =
    "whitespace-nowrap w-full inline-flex items-center justify-center rounded-[8px] leading-[1] transition-all duration-300 font-bold   cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};
