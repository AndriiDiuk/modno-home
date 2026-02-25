import Image from "next/image";
import React from "react";

interface ColorSelectorProps {
  colors?: string[];
  onSeeMore?: () => void;
  className?: string;
}

const DEFAULT_COLORS = [
  "/images/colors/ic-1.png",
  "/images/colors/ic-18.png",
  "/images/colors/ic-2.png",
  "/images/colors/ic-12.png",
  "/images/colors/ic-16.png",
];

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors = DEFAULT_COLORS,
  onSeeMore,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-4 md:gap-6 md:pl-[6px] md:pr-[20px] md:py-[6px] rounded-full bg-white w-fit ${className}`}
    >
      <div className='flex items-center gap-[6px] '>
        {colors.map((src, index) => (
          <div
            key={index}
            className='relative w-[70px] h-[70px] rounded-full  overflow-hidden '
          >
            <Image
              src={src}
              alt={`Color ${index + 1}`}
              fill
              className='object-cover'
              sizes='70px'
            />
          </div>
        ))}
      </div>
      <button
        onClick={onSeeMore}
        className='text-[14px] cursor-pointer md:text-[16px] text-brand-black hover:text-brand-black/70 transition-colors underline underline-offset-4 decoration-black/30'
      >
        смотреть ещё
      </button>
    </div>
  );
};
