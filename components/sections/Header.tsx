"use client";

import { Logo, TelegramIcon, VkIcon } from "@/assets/icons";
import { Button, CircleCTA } from "@/components/ui";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  data: {
    logoDescription?: string;
    workingHours?: string;
    phone?: string;
    socials?: {
      telegram?: string;
      vk?: string;
    };
  };
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const {
    logoDescription = "Производство модульных диванов в Челябинске с доставкой по РФ",
    workingHours = "Шоурум в Челябинске с 9:00 до 18:00",
    phone = "+7 (992) 503-54-99",
    socials = {},
  } = data;

  return (
    <header className='w-full  py-4'>
      <div className='content flex items-center justify-between gap-8'>
        {/* Left: Logo and Description */}
        <div className='flex items-center gap-2'>
          <Link href='/' className='flex flex-col'>
            <Logo
              width={150}
              height={35}
              className='max-w-[150px] md:max-w-[174px] w-full'
            />
          </Link>

          <div className='h-12 w-px bg-[#222222] hidden xl:block ml-2' />

          <p className='text-[13px] max-w-[250px] leading-[1.4] hidden xl:block'>
            {logoDescription}
          </p>
        </div>

        <div className='hidden lg:flex gap-5'>
          <CircleCTA
            text='Смотреть'
            className='text-[14px] leading-none h-auto'
            onClick={() => {}}
          />
          <CircleCTA
            text='Смотреть'
            className='text-[14px] leading-none h-auto'
            onClick={() => {}}
            delay='1s'
          />
        </div>

        {/* Center: Working Hours */}
        <div className='flex items-center gap-4 lg:gap-8'>
          <div className='flex flex-col text-right  max-w-[150px] md:text-center text-black'>
            <p className='text-[13px] font-medium  leading-snug whitespace-pre-line'>
              {workingHours}
            </p>
          </div>
        </div>
        {/* Social Icons */}
        <div className='hidden lg:flex items-center gap-3'>
          {socials.telegram && (
            <Link href={socials.telegram} target='_blank'>
              <TelegramIcon
                width={50}
                height={38}
                className='hover:opacity-80 transition-opacity'
              />
            </Link>
          )}
          {socials.vk && (
            <Link href={socials.vk} target='_blank'>
              <VkIcon
                width={50}
                height={38}
                className='hover:opacity-80 transition-opacity'
              />
            </Link>
          )}
        </div>

        {/* Contact Info & Call to Action */}
        <div className='hidden lg:flex  flex-col items-end gap-1'>
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className='text-lg lg:text-xl font-bold text-black'
          >
            {phone}
          </a>

          <Button
            label='Заказать звонок'
            variant='light'
            size='sm'
            className='text-[14px] leading-none h-auto'
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Decorative Bottom Line (like in referenced image) */}
      <div className='content'>
        <div className=' lg:block hidden h-px xl:w-[calc(100%-12rem)] w-full bg-[#7F7F7F] mx-auto mt-5' />
      </div>
    </header>
  );
};
