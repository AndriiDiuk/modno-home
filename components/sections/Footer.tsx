"use client";

import { Logo, TelegramIcon, VkIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";

interface FooterProps {
  data: {
    header?: {
      logoDescription?: string;
      phone?: string;
      socials?: {
        telegram?: string;
        vk?: string;
      };
    };
    footer?: {
      copyright?: string;
      privacyPolicyText?: string;
      privacyPolicyLink?: string;
    };
  };
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const {
    header: {
      logoDescription = "Производство модульных диванов в Челябинске с доставкой по РФ",
      phone = "+7 (992) 503-54-99",
      socials = {},
    } = {},
    footer: {
      copyright = "© modno-home 2026",
      privacyPolicyText = "Политика конфиденциальности",
      privacyPolicyLink = "/privacy-policy",
    } = {},
  } = data;

  return (
    <footer className='w-full py-10'>
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

          <div className='h-12 w-px bg-[#222222] hidden xl:block' />

          <p className='text-xs max-w-[250px] leading-tight hidden xl:block'>
            {logoDescription}
          </p>
        </div>

        {/* Center: Copyright & Privacy Policy */}
        <div className='flex flex-col items-center text-center'>
          <p className='text-[12px] text-[#222222] font-medium'>{copyright}</p>
          <Link
            href={privacyPolicyLink}
            className='text-[12px] text-[#222222] font-medium hover:opacity-70 transition-opacity'
          >
            {privacyPolicyText}
          </Link>
        </div>

        {/* Right Area: Socials, Phone, Button */}
        <div className='flex items-center gap-10'>
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
          <div className='hidden lg:flex flex-col items-end gap-1'>
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
      </div>
    </footer>
  );
};
