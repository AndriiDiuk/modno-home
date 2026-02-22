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
    <div className={`flex flex-col items-end gap-1 ${className}`}>
      <a
        href={`tel:${phone.replace(/\D/g, "")}`}
        className='text-lg lg:text-xl font-bold text-black hover:opacity-70 transition-opacity'
      >
        {phone}
      </a>

      <Button
        label='Заказать звонок'
        variant='light'
        size='sm'
        className='text-[14px] leading-none h-auto'
        onClick={openModal}
      />
    </div>
  );
};
