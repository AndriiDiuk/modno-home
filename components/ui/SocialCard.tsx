import Link from "next/link";
import React from "react";

interface SocialCardProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  buttonText?: string;
}

export const SocialCard: React.FC<SocialCardProps> = ({
  icon,
  label,
  href,
  buttonText = "Перейти",
}) => {
  return (
    <div className='flex flex-col items-center gap-2.5'>
      <div className='w-[76px] h-[76px] rounded-full border border-brand-black/20 flex items-center justify-center p-4'>
        {icon}
      </div>
      <span className='text-[14px] font-medium text-brand-black'>{label}</span>
      <Link
        href={href}
        target='_blank'
        className='bg-[#E6F2FF] text-[#646464] px-6 py-2 rounded-[4px] text-[12px]  font-bold hover:bg-[#D9E9FA] transition-colors'
      >
        {buttonText}
      </Link>
    </div>
  );
};
