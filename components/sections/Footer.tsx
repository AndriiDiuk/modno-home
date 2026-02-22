"use client";

import { Brand, ContactGroup, SocialLinks } from "@/components/ui";
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
      <div className='content flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='order-1 md:order-1 flex gap-2 '>
          d <Brand description={logoDescription} />
        </div>

        <div className='flex flex-col items-center text-center order-3 md:order-2'>
          <p className='text-[12px] text-brand-black font-medium'>
            {copyright}
          </p>
          <Link
            href={privacyPolicyLink}
            className='text-[12px] text-brand-black font-medium hover:opacity-70 transition-opacity'
          >
            {privacyPolicyText}
          </Link>
        </div>

        {/* Right Area: Socials, Phone, Button */}
        <div className='flex flex-col md:flex-row items-center gap-10 order-2 md:order-3'>
          <SocialLinks socials={socials} />

          <ContactGroup phone={phone} />
        </div>
      </div>
    </footer>
  );
};
