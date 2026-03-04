import { VkSquareIcon, YoutubeIcon } from "@/assets/icons";
import { SocialCard } from "@/components/ui/SocialCard";
import React from "react";

interface SuccessMessageProps {
  socials?: {
    vk?: string;
    youtube?: string;
  };
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  socials = {
    vk: "",
    youtube: "",
  },
}) => {
  return (
    <div className='flex flex-col items-center w-[696px] max-w-full mx-auto'>
      {/* Upper box */}
      <div className='w-full bg-brand-light-gray rounded-[20px] py-12 md:py-16 px-6 md:px-10 flex flex-col items-center text-center mb-[32px]'>
        <h2 className='text-[40px] font-bold text-brand-black mb-4 uppercase tracking-wider'>
          СПАСИБО
        </h2>
        <p className='text-[18px] text-brand-black font-bold leading-[1.2] max-w-[400px]'>
          Наш сайт работает быстро, <br /> скоро вам перезвоним
        </p>
      </div>

      {/* Socials section */}
      <p className='text-[14px] md:text-[16px] text-brand-black mb-4 text-center'>
        Следите за нами в соц. сетях, подписывайтесь
      </p>

      <div className='flex flex-row justify-center gap-[72px] md:gap-[60px] w-full pb-7.5'>
        <SocialCard
          icon={<VkSquareIcon className='w-[32px] h-[32px] text-brand-black' />}
          label='Мы Вконтакте'
          href={socials.vk || "#"}
        />
        <SocialCard
          icon={<YoutubeIcon className='w-full h-full text-brand-black' />}
          label='Мы на YouTube'
          href={socials.youtube || "#"}
        />
      </div>
    </div>
  );
};
