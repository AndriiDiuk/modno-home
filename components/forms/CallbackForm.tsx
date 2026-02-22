"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";

export const CallbackForm: React.FC = () => {
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
        БЫСТРО ПЕРЕЗВОНИМ
      </h2>
      <p className='text-brand-black/60 text-base  mb-8 text-center'>
        Заполните форму ниже
      </p>

      <div className='w-full mb-4'>
        <Input
          placeholder='Ваш телефон'
          isPhone={true}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <button
        type='submit'
        className='w-full bg-brand-dark hover:bg-black text-white font-black py-5 px-6 rounded-xl transition-all shadow-lg active:scale-[0.98] text-lg uppercase mb-4 cursor-pointer'
      >
        ЖДУ ЗВОНКА
      </button>

      <label className='flex items-center gap-2 cursor-pointer select-none'>
        <div className='relative flex items-center'>
          <input
            type='checkbox'
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className='peer appearance-none w-4 h-4 border border-brand-black/30 rounded-sm checked:bg-brand-dark transition-all'
            required
          />
          <svg
            className='absolute left-0 top-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none p-[2px]'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='4'
          >
            <polyline points='20 6 9 17 4 12'></polyline>
          </svg>
        </div>
        <span className='text-[11px] md:text-xs text-brand-black/50'>
          Согласен на обработку персональных данных
        </span>
      </label>
    </form>
  );
};
