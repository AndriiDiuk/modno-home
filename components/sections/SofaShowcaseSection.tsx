import Image from "next/image";
import React from "react";

interface SofaShowcaseSectionProps {
  title: string;
  description: string;
  image: string;
  mobileImage: string;
  className?: string;
}

export const SofaShowcaseSection: React.FC<SofaShowcaseSectionProps> = ({
  title,
  description,
  image,
  mobileImage,
  className = "",
}) => {
  return (
    <section className={`w-full py-10 md:py-20 ${className}`}>
      {/* Mobile Layout */}
      <div className='content flex flex-col items-center text-center md:hidden'>
        <h2 className='text-[24px] font-bold text-brand-black leading-[1.2] mb-4'>
          {title}
        </h2>
        <p className='text-[14px] text-brand-gray leading-[1.6] mb-6 max-w-[340px]'>
          {description}
        </p>
        <div className='relative w-full max-w-[360px] aspect-square'>
          <Image
            src={mobileImage}
            alt={title}
            fill
            className='object-contain'
            sizes='360px'
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='content hidden md:flex items-center gap-10 lg:gap-16'>
        <div className='w-[40%] lg:w-[35%] shrink-0'>
          <h2 className='text-[32px] lg:text-[40px] font-bold text-brand-black leading-[1.2] mb-5'>
            {title}
          </h2>
          <p className='text-[15px] lg:text-[16px] text-brand-gray leading-[1.7]'>
            {description}
          </p>
        </div>
        <div className='relative flex-1 aspect-[4/3]'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-contain'
            sizes='(max-width: 1280px) 60vw, 800px'
          />
        </div>
      </div>
    </section>
  );
};
