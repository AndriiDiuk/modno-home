"use client";

import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isPhone?: boolean;
  phoneError?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  isPhone,
  onChange,
  value,
  phoneError: externalPhoneError,
  ...props
}) => {
  const [phoneError, setPhoneError] = useState("");

  const formatPhoneNumber = (val: string) => {
    const numbers = val.replace(/\D/g, "");
    const cleaned = numbers.substring(0, 10);

    let formatted = "";
    if (cleaned.length > 0) {
      formatted += "(" + cleaned.substring(0, 3);
    }
    if (cleaned.length >= 4) {
      formatted += ") " + cleaned.substring(3, 6);
    }
    if (cleaned.length >= 7) {
      formatted += "-" + cleaned.substring(6, 8);
    }
    if (cleaned.length >= 9) {
      formatted += "-" + cleaned.substring(8, 10);
    }
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPhone) {
      const numbers = e.target.value.replace(/\D/g, "");
      if (numbers.length > 0 && numbers[0] !== "9") {
        setPhoneError("Первая цифра номера должна быть 9");
      } else {
        setPhoneError("");
      }
      const formattedValue = formatPhoneNumber(e.target.value);
      e.target.value = formattedValue;
      onChange?.(e);
    } else {
      onChange?.(e);
    }
  };

  // Блокуємо введення першої цифри якщо не 9
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPhone) {
      const numbers = (value as string || "").replace(/\D/g, "");
      // Якщо поле порожнє і вводиться не 9 — блокуємо
      if (numbers.length === 0 && e.key.match(/^\d$/) && e.key !== "9") {
        e.preventDefault();
        setPhoneError("Первая цифра номера должна быть 9");
        return;
      }
    }
    props.onKeyDown?.(e);
  };

  // Блокуємо вставку якщо перша цифра не 9
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isPhone) {
      const pasted = e.clipboardData.getData("text");
      const numbers = pasted.replace(/\D/g, "");
      if (numbers.length > 0 && numbers[0] !== "9") {
        e.preventDefault();
        setPhoneError("Первая цифра номера должна быть 9");
        return;
      }
    }
    props.onPaste?.(e);
  };

  const errorToShow = externalPhoneError || phoneError;

  return (
    <div className='w-full flex flex-col gap-2 min-w-[242px] md:min-w-[320px] relative'>
      {label && <label className='text-sm font-medium'>{label}</label>}
      <div className='relative w-full overflow-hidden'>
        {isPhone && (
          <span className='absolute left-6 top-1/2 -translate-y-1/2 text-[14px] md:text-lg text-brand-black pointer-events-none'>
            +7
          </span>
        )}
        <input
          {...props}
          type={isPhone ? "tel" : props.type}
          inputMode={isPhone ? "numeric" : props.inputMode}
          value={value}
          onChange={handlePhoneChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={isPhone ? "(9XX) XXX-XX-XX" : props.placeholder}
          className={`w-full ${isPhone ? "pl-12 md:pl-14" : "px-6"} py-4 border rounded-md focus:outline-none transition-colors placeholder:text-brand-black/30 text-[14px] md:text-lg ${
            errorToShow
              ? "border-red-500 focus:border-red-500 text-red-500"
              : "border-brand-black/20 focus:border-brand-black"
          } ${props.className || ""}`}
        />
      </div>
      {isPhone && (
        <p className='absolute bottom-full left-0 text-red-500 text-xs mb-1 whitespace-nowrap'>
          {errorToShow || ""}
        </p>
      )}
    </div>
  );
};
