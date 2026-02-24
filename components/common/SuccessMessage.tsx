import { VkIcon, YoutubeIcon } from "@/assets/icons";
import Link from "next/link";
import React from "react";

interface SuccessMessageProps {
  socials?: {
    vk?: string;
    youtube?: string;
  };
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  socials = {
    vk: "https://vk.com",
    youtube: "https://youtube.com",
  },
}) => {
  return (
    <div className='flex flex-col items-center w-full'>
      {/* Upper box */}
      <div className='w-full bg-brand-light-gray rounded-[20px] py-12 md:py-16 px-6 md:px-10 flex flex-col items-center text-center mb-10'>
        <h2 className='text-[32px] md:text-[40px] font-bold text-brand-black mb-4 uppercase tracking-wider'>
          СПАСИБО
        </h2>
        <p className='text-[18px] md:text-[22px] text-brand-black leading-tight max-w-[400px]'>
          Наш сайт работает быстро, <br /> скоро вам перезвоним
        </p>
      </div>

      {/* Socials section */}
      <p className='text-[14px] md:text-[16px] text-brand-black/60 mb-8 text-center'>
        Следите за нами в соц. сетях, подписывайтесь
      </p>

      <div className='flex flex-row justify-center gap-10 md:gap-20 w-full'>
        {/* VK */}
        <div className='flex flex-col items-center gap-4'>
          <div className='w-20 h-20 md:w-24 md:h-24 rounded-full border border-brand-black/20 flex items-center justify-center p-5'>
            <VkIcon className='w-full h-full text-brand-black' />
          </div>
          <span className='text-[14px] md:text-[16px] font-medium text-brand-black'>
            Мы Вконтакте
          </span>
          <Link
            href={socials.vk || "#"}
            target='_blank'
            className='bg-[#E6F2FF] text-[#4A76A8] px-6 py-2 rounded-[4px] text-[13px] md:text-[14px] font-medium hover:bg-[#D9E9FA] transition-colors'
          >
            Перейти
          </Link>
        </div>

        {/* YouTube */}
        <div className='flex flex-col items-center gap-4'>
          <div className='w-20 h-20 md:w-24 md:h-24 rounded-full border border-brand-black/20 flex items-center justify-center p-5'>
            <YoutubeIcon className='w-full h-full' />
          </div>
          <span className='text-[14px] md:text-[16px] font-medium text-brand-black'>
            Мы на YouTube
          </span>
          <Link
            href={socials.youtube || "#"}
            target='_blank'
            className='bg-[#E6F2FF] text-[#4A76A8] px-6 py-2 rounded-[4px] text-[13px] md:text-[14px] font-medium hover:bg-[#D9E9FA] transition-colors'
          >
            Перейти
          </Link>
        </div>
      </div>
    </div>
  );
};
