"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AppButton } from "../ui/AppButton";

interface RealzViewProps {
  images: string[];
  title?: string;
  className?: string;
}

export const RealzView: React.FC<RealzViewProps> = ({
  images,
  title = "Как он выглядит?",
  className = "",
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  // Close on Escape key and handle Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  return (
    <section className={`w-full  ${className}`}>
      <div className='content flex flex-col items-center'>
        <h2 className='text-[24px] md:text-[32px] font-bold text-center mb-8 md:mb-12 block md:hidden'>
          {title}
        </h2>

        {/* Desktop Layout */}
        <div className='hidden md:grid grid-cols-5 gap-5 w-full'>
          {images.map((src, index) => (
            <div
              key={index}
              className='relative w-full aspect-230/136 max-w-[230px] rounded-[8px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mx-auto'
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={src}
                alt={`View ${index + 1}`}
                fill
                className='object-cover'
                sizes='(max-width: 1200px) 25vw, 20vw'
              />
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className='md:hidden flex flex-col items-center w-full gap-6'>
          <div className='grid grid-cols-2 gap-3 w-full'>
            {(showAll ? images : images.slice(0, 4)).map((src, index) => (
              <div
                key={index}
                className='relative w-full aspect-230/136 rounded-[8px] overflow-hidden cursor-pointer'
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={src}
                  alt={`View ${index + 1}`}
                  fill
                  className='object-cover'
                  sizes='50vw'
                />
              </div>
            ))}
          </div>

          {!showAll && images.length > 4 && (
            <AppButton
              label='СМОТРЕТЬ ЕЩЕ'
              variant='secondary'
              onClick={() => setShowAll(true)}
              className='w-fit! px-12'
            />
          )}
        </div>
      </div>

      {/* Lightbox / Modal - Video style (no white background) */}
      {selectedIndex !== null && (
        <div
          className='fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4'
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className='absolute top-6 right-6 text-white hover:opacity-70 transition-opacity cursor-pointer p-2 z-10'
            aria-label='Close'
          >
            <svg
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className='absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity cursor-pointer p-4 z-10'
          >
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='15 18 9 12 15 6'></polyline>
            </svg>
          </button>

          <button
            onClick={handleNext}
            className='absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity cursor-pointer p-4 z-10'
          >
            <svg
              width='40'
              height='40'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='9 18 15 12 9 6'></polyline>
            </svg>
          </button>

          <div
            className='relative w-full max-w-5xl h-[80vh] flex items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt='Full view'
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
};
