import Image from "next/image";
import React from "react";

interface CircleCTAProps {
  text: string;
  imageSrc?: string;
  onClick: () => void;
  className?: string;
}

export const CircleCTA: React.FC<CircleCTAProps> = ({
  text,
  imageSrc,
  onClick,
  className = "",
}) => {
  return (
    <div className={`relative flex flex-col items-center w-fit  ${className}`}>
      <div className='p-[2px] rounded-full bg-[radial-gradient(circle_at_30%_100%,#FFDD55_0%,#FFDD55_10%,#FF543E_50%,#C837AB_100%)] animate-pulse-border'>
        <div className='relative w-[66px] h-[66px] rounded-full overflow-hidden border-4 border-white bg-gray-100 shadow-inner'>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={text}
              fill
              className='object-cover hover:scale-110 transition-transform duration-500'
              sizes='58px'
            />
          ) : (
            <div className='w-full h-full bg-gray-200 animate-pulse' />
          )}
        </div>
      </div>

      <button
        onClick={onClick}
        className='absolute bottom-0 bg-warning hover:scale-105 active:scale-95 text-[#222222] font-bold py-[6px] px-2 rounded-full shadow-xl transition-all text-[7px] uppercase  cursor-pointer z-10'
      >
        {text}
      </button>
    </div>
  );
};
