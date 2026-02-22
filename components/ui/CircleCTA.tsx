import Image from "next/image";
import React from "react";

interface CircleCTAProps {
  text: string;
  imageSrc: string;
  onClick: () => void;
  className?: string;
}

/**
 * CircleCTA component displays a circular image with an Instagram-style gradient border
 * and a prominent call-to-action button overlapping at the bottom.
 */
export const CircleCTA: React.FC<CircleCTAProps> = ({
  text,
  imageSrc,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`relative flex flex-col items-center w-fit p-4 ${className}`}
    >
      {/* Circle Container with Gradient Border */}
      <div className='p-[4px] rounded-full bg-[radial-gradient(circle_at_30%_100%,#FFDD55_0%,#FFDD55_10%,#FF543E_50%,#C837AB_100%)]'>
        <div className='relative w-32 h-32 rounded-full overflow-hidden border-[4px] border-white bg-white shadow-inner'>
          <Image
            src={imageSrc}
            alt={text}
            fill
            className='object-cover hover:scale-110 transition-transform duration-500'
            sizes='128px'
            priority
          />
        </div>
      </div>

      {/* Overlapping Button */}
      <button
        onClick={onClick}
        className='absolute -bottom-2 bg-warning hover:scale-105 active:scale-95 text-black font-bold py-3 px-8 rounded-full shadow-xl transition-all text-sm uppercase tracking-wider cursor-pointer z-10'
      >
        {text}
      </button>
    </div>
  );
};
