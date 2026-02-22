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
    <div className='w-full flex flex-col gap-2'>
      {label && <label className='text-sm font-medium'>{label}</label>}
      <input
        {...props}
        value={value}
        onChange={handlePhoneChange}
        className='w-full px-6 py-4 border border-[#222222]/20 rounded-xl focus:outline-none focus:border-[#222222] transition-colors placeholder:text-[#222222]/30 text-lg'
      />
    </div>
  );
};
