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
    <section className={`w-full pt-10 md:pt-20 ${className}`}>
      {/* Mobile Layout */}
      <div className='content md:hidden relative h-[clamp(300px,80vw,450px)]'>
        <Image
          src={mobileImage}
          alt={title}
          fill
          className='object-contain object-bottom'
          sizes='100vw'
        />
        <div className='absolute left-0 right-0 top-0 z-10 text-center'>
          <h2 className='text-[18px] font-bold text-brand-black leading-[1.2]'>
            {title}
          </h2>
          <p className='text-[14px] text-brand-black leading-[1.2] mx-auto max-w-[80%] md:max-w-[340px]'>
            {description}
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='content hidden md:block relative h-[clamp(280px,30vw,450px)]'>
        {/* Image fills the container */}
        <Image
          src={image}
          alt={title}
          fill
          className='object-contain object-right'
          sizes='100vw'
        />
        {/* Text overlay */}
        <div className='absolute left-0 top-0 z-10 w-[40%] lg:w-[35%]'>
          <h2 className='text-[16px] lg:text-[18px] font-bold text-brand-black leading-[1.2]'>
            {title}
          </h2>
          <p className='text-[15px] lg:text-[16px] text-brand-black leading-[1.7]'>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
