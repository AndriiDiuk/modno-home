"use client";

import React, { useState } from "react";
import { Checkbox, FormButton, Input } from "../ui";

interface CallbackFormProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

export const CallbackForm: React.FC<CallbackFormProps> = ({
  title = "БЫСТРО ПЕРЕЗВОНИМ",
  subtitle = "Заполните форму ниже",
  buttonLabel = "ЖДУ ЗВОНКА",
}) => {
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit callback:", { phone, agreed });
    // Handle submission here
    alert("Спасибо! Мы перезвоним вам в ближайшее время.");
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <h2 className='text-xl md:text-2xl font-bold text-brand-black mb-2 uppercase tracking-tight text-center'>
        {title}
      </h2>
      <p className='text-brand-black/60 text-base  mb-8 text-center'>
        {subtitle}
      </p>

      <div className='w-fit mb-4'>
        <Input
          placeholder='Ваш телефон'
          isPhone={true}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <FormButton label={buttonLabel} />

      <Checkbox
        label='Согласен на обработку персональных данных'
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        required
      />
    </form>
  );
};
