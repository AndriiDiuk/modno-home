"use client";

import { CallbackForm } from "@/components/forms/CallbackForm";
import { Button, Modal } from "@/components/ui";
import Image from "next/image";
import React, { useState } from "react";

interface DownloadCatalogProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  edition?: string;
  className?: string;
}

export const DownloadCatalog: React.FC<DownloadCatalogProps> = ({
  title = "Скачивайте каталог!",
  subtitle = "Там больше вариантов и комплектаций.",
  buttonLabel = "Скачать каталог",
  edition = "Издание 2026 г.",
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className={`w-full py-16 md:py-24 bg-brand-light-gray ${className}`}
    >
      <div className='content'>
        <div className='w-full relative rounded-[8px] overflow-hidden shadow-xl flex flex-col justify-between  h-full md:flex-row min-h-[270px]'>
          {/* Background Split */}
          <div className='absolute inset-0  flex-col hidden md:flex'>
            <div className='flex-1 bg-white' />
            <div className='flex-1 bg-brand-dark' />
          </div>

          {/* Image - left on desktop, center on mobile */}
          <div className='hidden md:block relative z-10 w-[44%] md:w-1/2 md:h-auto overflow-hidden'>
            <div
              className='absolute -left-[16%] bottom-0 translate-y-[52%]'
              style={{
                width: "clamp(300px, 45vw, 620px)",
                height: "clamp(400px, 55vw, 800px)",
              }}
            >
              <Image
                src='/images/catalog.webp'
                alt='Каталог мебели'
                fill
                className='object-contain'
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className=' h-full md:w-[66%] w-full relative z-10 leading-[1.2] md:pr-12 md:pt-10 md:pb-7 flex flex-col justify-between md:justify-center items-center md:items-start text-center md:text-left'>
            <div className='mb-6 md:mb-12 font-bold'>
              <h2 className='text-[26px] md:text-[30px] text-brand-black leading-tight mb-2'>
                {title}
              </h2>
              <p className='text-[22px] md:text-[25px] text-brand-black'>
                {subtitle}
              </p>
            </div>
            <div
              className='-mb-[60%] left-[-10%] relative z-0 block md:hidden'
              style={{
                width: "clamp(500px, 130vw, 900px)",
                height: "clamp(350px, 110vw, 600px)",
              }}
            >
              <Image
                src='/images/catalog.webp'
                alt='Каталог мебели'
                fill
                className='object-contain'
                priority
              />
            </div>
            <div className='flex flex-col items-center md:w-fit gap-2 bg-brand-dark w-full md:bg-transparent py-7 md:py-0 relative z-10'>
              <Button
                label={` ${buttonLabel}`}
                variant='dark'
                size='lg'
                onClick={() => setIsModalOpen(true)}
                className='w-[240px]!'
              />
              <span className='text-white/40 text-[12px] leading-[1.2]'>
                {edition}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Catalog Download */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className='max-w-[1010px]'
      >
        <div className='relative flex flex-col lg:flex-row gap-6 md:gap-10 items-center overflow-hidden lg:min-h-[400px]'>
          <div className='w-full lg:w-1/2'>
            <CallbackForm
              title='Чтобы получить каталог, заполните форму'
              subtitle=''
              buttonLabel='Жду каталог'
            />
          </div>

          {/* Right Side: Catalog Image */}
          <div className='relative lg:absolute lg:right-[6%] lg:-bottom-[56%] w-full lg:w-1/2 lg:h-[740px]  lg:scale-[1.2] z-0'>
            <Image
              src='/images/catalog.webp'
              alt='Каталог мебели'
              fill
              className='object-contain'
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};
