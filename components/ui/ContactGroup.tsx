"use client";

import React from "react";
import { useModal } from "../providers/ModalProvider";
import { Button } from "./Button";

interface ContactGroupProps {
  phone: string;
  className?: string;
}

export const ContactGroup: React.FC<ContactGroupProps> = ({
  phone,
  className = "",
}) => {
  const { openModal } = useModal();

  return (
    <div
      className={`flex flex-row md:flex-col md:items-end items-center gap-2 md:gap-1 ${className}`}
    >
      <a
        href={`tel:${phone.replace(/\D/g, "")}`}
        className='text-[14px] sm:text-lg lg:text-xl font-bold text-black hover:opacity-70 transition-opacity whitespace-nowrap'
      >
        {phone}
      </a>

      <Button
        label='Заказать звонок'
        variant='light'
        size='sm'
        className='text-[14px] leading-none h-auto'
        onClick={() => openModal()}
      />
    </div>
  );
};
