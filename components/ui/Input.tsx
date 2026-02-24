"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isPhone?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  isPhone,
  onChange,
  value,
  ...props
}) => {
  const formatPhoneNumber = (val: string) => {
    // Basic Russian phone mask implementation: +7 (999) 999-99-99
    const numbers = val.replace(/\D/g, "");
    if (!numbers) return "";

    let formatted = "+7 (";
    if (numbers.length > 1) {
      formatted += numbers.substring(1, 4);
    }
    if (numbers.length >= 5) {
      formatted += ") " + numbers.substring(4, 7);
    }
    if (numbers.length >= 8) {
      formatted += "-" + numbers.substring(7, 9);
    }
    if (numbers.length >= 10) {
      formatted += "-" + numbers.substring(9, 11);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPhone) {
      const formattedValue = formatPhoneNumber(e.target.value);
      // Trigger original onChange with the formatted value if size permits
      if (formattedValue.length <= 18) {
        e.target.value = formattedValue;
        onChange?.(e);
      }
    } else {
      onChange?.(e);
    }
  };

  return (
    <div className='w-full flex flex-col gap-2 min-w-[242px] md:min-w-[320px]'>
      {label && <label className='text-sm font-medium'>{label}</label>}
      <input
        {...props}
        type={isPhone ? "tel" : props.type}
        inputMode={isPhone ? "tel" : props.inputMode}
        value={value}
        onChange={handlePhoneChange}
        className={`w-full px-6 py-4 border border-brand-black/20 rounded-[6px] focus:outline-none focus:border-brand-black transition-colors placeholder:text-brand-black/30 text-[14px] md:text-lg ${props.className || ""}`}
      />
    </div>
  );
};
