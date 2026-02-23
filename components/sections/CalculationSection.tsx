"use client";

import { AppButton, Input } from "@/components/ui";
import React, { useState } from "react";

interface CalculationSectionProps {
  className?: string;
}

export const CalculationSection: React.FC<CalculationSectionProps> = ({
  className = "",
}) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit calculation request:", { phone });

    alert("Спасибо! Мы свяжемся с вами для расчета стоимости.");
  };

  return (
    <section className={`w-full py-12 md:py-20 ${className}`}>
      <div className='content'>
        <div className='max-w-[90%] md:max-w-[820px] w-full mx-auto border border-brand-border rounded-[24px] md:rounded-[16px] px-10 py-6 md:py-8 md:px-18 bg-white flex flex-col items-center '>
          <h2 className='text-[16px] md:text-[20px] font-bold text-center mb-6 md:mb-6 text-brand-black leading-tight sm:max-w-[60%] md:max-w-full  w-full'>
            Узнать стоимость своего варианта за 5 мин.
          </h2>

          <form
            onSubmit={handleSubmit}
            className='w-full flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-5 mb-2'
          >
            <Input
              placeholder='Ваш телефон'
              isPhone={true}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <AppButton
              type='submit'
              label='Узнать стоимость'
              variant='primary'
              size='lg'
            />
          </form>

          <p className='text-[12px] text-brand-black text-center leading-[1.2] max-w-[300px]'>
            Мы знаем, что наши клиенты не любят звонки, поэтому связь в WhatsApp
            или Telegram
          </p>
        </div>
      </div>
    </section>
  );
};
