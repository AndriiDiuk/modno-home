"use client";

import Image from "next/image";
import React from "react";

const FABRIC_DATA = [
  {
    category: "Рогожка",
    fabrics: [
      { name: "BRIAR", image: "/images/сloth/BRIAR.webp" },
      { name: "PLACIDA", image: "/images/сloth/PLACIDA.webp" },
      { name: "PIXEL URUS", image: "/images/сloth/PIXEL-URUS.webp" },
      { name: "OPERA", image: "/images/сloth/OPERA.webp" },
      { name: "CHANEL", image: "/images/сloth/CHANEL.webp" },
    ],
  },
  {
    category: "Шенилл",
    fabrics: [
      { name: "DIVINE", image: "/images/сloth/DIVINE.webp" },
      { name: "ENZO", image: "/images/сloth/ENZO.webp" },
      { name: "TIANA", image: "/images/сloth/TIANA.webp" },
      { name: "PIANO", image: "/images/сloth/PIANO.webp" },
      { name: "MARSEILLE", image: "/images/сloth/MARSEILLE.webp" },
    ],
  },
  {
    category: "Велюр",
    fabrics: [
      { name: "MANHATTAN", image: "/images/сloth/MANHATTAN.webp" },
      { name: "MISSONI", image: "/images/сloth/MISSONI.webp" },
      { name: "AURA", image: "/images/сloth/AURA.webp" },
      { name: "AVELINA", image: "/images/сloth/AVELINA.webp" },
      { name: "ALPINA", image: "/images/сloth/ALPINA.webp" },
    ],
  },
  {
    category: "Флок",
    fabrics: [
      { name: "CLUB", image: "/images/сloth/CLUB.webp" },
      { name: "IDOL", image: "/images/сloth/IDOL.webp" },
    ],
  },
  {
    category: "Замша",
    fabrics: [
      { name: "BENTLEY PLAIN", image: "/images/сloth/BENTLEY-PLAIN.webp" },
    ],
  },
];

interface FabricSelectionProps {
  title?: string;
  subtitle?: string;
}

export const FabricSelection: React.FC<FabricSelectionProps> = ({
  title = "Большой выбор тканей",
  subtitle = "Больше 100 конфигураций и цветов",
}) => {
  return (
    <section className='w-full pt-10 md:pb-0 md:pt-24 overflow-hidden bg-[#FCFCFC] '>
      <div className='content '>
        <div className='text-center mb-5 md:mb-10 lg:mb-0 '>
          <h2 className='text-[30px] md:text-[50px] font-bold text-brand-black leading-[1.1] uppercase mb-1 md:mb-3'>
            {title}
          </h2>
          <p className='text-[18px] md:text-[34px] text-brand-black font-light leading-[1.1]'>
            {subtitle}
          </p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row items-end  '>
        {/* Left: Sofa Image - Touching Left Edge */}
        <div className='hidden lg:flex w-full lg:w-[40%] relative mb-10 lg:mb-0'>
          <div className='relative w-full h-[300px] md:h-[500px] lg:h-[600px]'>
            <Image
              src='/images/image-sofa.webp'
              alt='Sofa with fabric selection'
              fill
              className='object-contain lg:object-left'
              priority
            />
          </div>
        </div>

        {/* Right: Fabric Selection Content */}
        <div className=' flex justify-center w-full lg:w-[60%] px-4 lg:pl-0 lg:pr-[calc((100vw-1280px)/2+1rem)] xl:pr-[calc((100vw-1280px)/2+1rem)] lg:pt-[70px]  lg:pb-[100px]'>
          <div className='grid grid-cols-5 gap-3 md:gap-5 max-w-[800px]'>
            {FABRIC_DATA.map((item) => (
              <div key={item.category} className='flex flex-col gap-3 md:gap-5'>
                {/* Category Label */}
                <div className='px-2 md:px-7 py-2 md:py-2.5 rounded-[8px] w-full max-w-[78px] md:max-w-[136px] border text-[14px] md:text-[20px] font-light bg-white text-[#434343] border-[#434343] text-center'>
                  {item.category}
                </div>

                {/* Fabrics in this column */}
                <div className='flex flex-col gap-[10px] md:gap-5'>
                  {item.fabrics.map((fabric) => (
                    <div
                      key={fabric.name}
                      className='relative w-full max-w-[78px] md:max-w-[136px] h-[43px] md:h-[78px] rounded-[8px] overflow-hidden group  bg-white'
                    >
                      <Image
                        src={fabric.image}
                        alt={fabric.name}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                      {/* Darker overlay for text readability */}
                      {/* <div className='absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300' /> */}
                      <div className='absolute left-[8px] md:left-[14px] top-[8px] md:top-[14px] flex items-center justify-center '>
                        <span className='text-white text-[9px] xsm:text-[10px] md:text-[18px] font-medium uppercase tracking-wider leading-[1.1]  pointer-events-none'>
                          {fabric.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
