import Image from "next/image";
import React from "react";

interface ColorItemProps {
  src: string;
  name: string;
  pantone: string;
}

export const ColorItem: React.FC<ColorItemProps> = ({ src, name, pantone }) => {
  return (
    <div className='flex flex-col items-center text-center group cursor-pointer'>
      <div className='relative w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] rounded-full overflow-hidden mb-[10px]'>
        <Image
          src={src}
          alt={name}
          fill
          className='object-cover'
          sizes='70px'
        />
      </div>
      <div className='flex flex-col text-[9px] leading-[1.1] whitespace-nowrap '>
        <span className='font-bold'>PANTONE</span>
        <span>{pantone}</span>
        <span>{name}</span>
      </div>
    </div>
  );
};
