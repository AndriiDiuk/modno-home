"use client";

import { VideoModal } from "@/components/common/VideoModal";
import { Brand, CircleCTA, ContactGroup, SocialLinks } from "@/components/ui";
import React, { useState } from "react";

interface HeaderProps {
  data: {
    header?: {
      logoDescription?: string;
      workingHours?: string;
      phone?: string;
      socials?: {
        telegram?: string;
        vk?: string;
      };
    };
  };
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const {
    header: {
      logoDescription = "Производство модульных диванов в Челябинске с доставкой по РФ",
      workingHours = "Шоурум в Челябинске с 9:00 до 18:00",
      phone = "+7 (992) 503-54-99",
      socials = {},
    } = {},
  } = data || {};

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <header className='absolute top-0 left-0 w-full z-100 py-4'>
        <div className='content flex items-center justify-between gap-8'>
          {/* Left: Logo and Description */}
          <Brand description={logoDescription} />

          <div className='hidden lg:flex gap-5'>
            <CircleCTA
              text='Смотреть'
              imageSrc='/images/stories/st_1.webp'
              className='text-[14px] leading-none h-auto'
              onClick={() => setActiveVideo("/video/1.mp4")}
            />
            <CircleCTA
              text='Смотреть'
              imageSrc='/images/stories/st_2.webp'
              className='text-[14px] leading-none h-auto'
              onClick={() => setActiveVideo("/video/2.mp4")}
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
          <SocialLinks socials={socials} className='hidden lg:flex' />

          {/* Contact Info & Call to Action */}
          <div className='hidden lg:block'>
            <ContactGroup phone={phone} />
          </div>
        </div>

        {/* Decorative Bottom Line (like in referenced image) */}
        <div className='content'>
          <div className=' lg:block hidden h-px xl:w-[calc(100%-12rem)] w-full bg-brand-gray mx-auto mt-5' />
        </div>
      </header>

      {/* Video Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoSrc={activeVideo || ""}
      />
    </>
  );
};
