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
        <div className='w-full relative rounded-[8px] overflow-hidden shadow-xl flex flex-col md:flex-row min-h-[270px]'>
          {/* Background Split */}
          <div className='absolute inset-0 flex flex-col'>
            <div className='flex-1 bg-white' />
            <div className='flex-1 bg-brand-dark' />
          </div>

          {/* Image - left on desktop, center on mobile */}
          <div className='relative z-10 w-[44%] md:w-1/2 md:h-auto overflow-hidden'>
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
          <div className='w-[66%] relative z-10 leading-[1.2] pr-12 pt-10 pb-7 flex flex-col justify-center items-center md:items-start text-center md:text-left'>
            <div className='mb-6 md:mb-12 font-bold'>
              <h2 className='text-[26px] md:text-[30px] text-brand-black leading-tight mb-2'>
                {title}
              </h2>
              <p className='text-[22px] md:text-[25px] text-brand-black'>
                {subtitle}
              </p>
            </div>

            <div className='flex flex-col items-center w-fit gap-2'>
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
              title='ЧТОБЫ ПОЛУЧИТЬ КАТАЛОГ ЗАПОЛНИТЕ ФОРМУ'
              subtitle=''
              buttonLabel='ЖДУ КАТАЛОГ'
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
