import React from "react";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

/**
 * Reusable primary button for forms.
 * Features a filled brand-dark background, black font weight, and uppercase text.
 */
export const FormButton: React.FC<FormButtonProps> = ({
  label,
  className = "",
  type = "submit",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`w-full bg-brand-dark hover:bg-black text-white font-bold py-5 px-6 rounded-[6px] transition-all shadow-lg active:scale-[0.98] text-lg uppercase mb-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};
