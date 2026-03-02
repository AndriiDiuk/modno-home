"use client";

import React, { useState } from "react";
import { SuccessMessage } from "../common/SuccessMessage";
import { AppButton, Checkbox, Input } from "../ui";

interface CallbackFormProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  image?: React.ReactNode;
  socials?: {
    vk?: string;
    youtube?: string;
  };
}

export const CallbackForm: React.FC<CallbackFormProps> = ({
  title = "БЫСТРО ПЕРЕЗВОНИМ",
  subtitle = "Заполните форму ниже",
  buttonLabel = "ЖДУ ЗВОНКА",
  image,
  socials,
}) => {
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit callback:", { phone, agreed });
    // Handle submission here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <SuccessMessage socials={socials} />;
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <h2 className='text-xl md:text-2xl font-bold text-brand-black mb-2 tracking-tight text-center'>
        {title}
      </h2>
      {subtitle && (
        <p className='text-brand-black/60 text-base  mb-8 text-center'>
          {subtitle}
        </p>
      )}
      {image && image}

      <div className='w-fit mb-4'>
        <Input
          placeholder='Ваш телефон'
          isPhone={true}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className='mb-4'>
        <AppButton label={buttonLabel} size='lg' variant='secondary' />
      </div>

      <Checkbox
        label='Согласен на обработку персональных данных'
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        required
      />
    </form>
  );
};
