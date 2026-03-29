"use client";

import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface RealzViewProps {
  images: string[];
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  className?: string;
}

const AUTOPLAY_INTERVAL = 5000;

export const RealzView: React.FC<RealzViewProps> = ({
  images,
  title = "Как он выглядит?",
  subtitle,
  showTitle = false,
  className = "",
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const slides = images.map((src) => ({ src }));

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 5,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 16 },
      },
    },
  });

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      instanceRef.current?.next();
    }, AUTOPLAY_INTERVAL);
  }, [instanceRef]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    instanceRef.current?.prev();
    resetTimer();
  };

  const handleNext = () => {
    instanceRef.current?.next();
    resetTimer();
  };

  // Reset padding-right that lightbox adds
  useEffect(() => {
    if (selectedIndex >= 0) {
      document.body.style.paddingRight = "0px";
    }
  }, [selectedIndex]);

  return (
    <section className={`w-full ${className}`}>
      <div className='content flex flex-col items-center'>
        {showTitle && (
          <div className='text-center mb-8 md:mb-[30px] leading-[1.1]'>
            <h2 className='text-[24px] md:text-[36px] font-bold text-brand-black'>
              {title}
            </h2>
            {subtitle && (
              <p className='text-[14px] md:text-[23px] text-brand-black mt-1'>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Desktop Layout — keen-slider */}
        <div className='hidden md:flex items-center gap-2 w-full'>
          <button
            onClick={handlePrev}
            className='shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-brand-black hover:bg-black/20 transition-colors cursor-pointer'
            aria-label='Previous'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='15 18 9 12 15 6' />
            </svg>
          </button>

          <div ref={sliderRef} className='keen-slider w-full'>
            {images.map((src, index) => (
              <div
                key={index}
                className='keen-slider__slide'
              >
                <div
                  className='relative w-full aspect-230/136 rounded-[8px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity'
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
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className='shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-brand-black hover:bg-black/20 transition-colors cursor-pointer'
            aria-label='Next'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='9 18 15 12 9 6' />
            </svg>
          </button>
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
            <button
              onClick={() => setShowAll(true)}
              className='min-w-[242px] md:min-w-[320px] whitespace-nowrap inline-flex items-center justify-center rounded-[8px] leading-[1] transition-all duration-300 font-bold cursor-pointer bg-[#222222] text-white hover:bg-[#222222]/80 border-transparent px-12 py-4 text-[14px] w-fit active:scale-[0.98]'
            >
              СМОТРЕТЬ ЕЩЕ
            </button>
          )}
        </div>
      </div>

      <Lightbox
        open={selectedIndex >= 0}
        index={selectedIndex}
        close={() => setSelectedIndex(-1)}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        }}
        render={{
          slide: ({ slide }) => (
            <div className='relative w-full h-full max-w-[90vw] max-h-[80vh] md:max-w-[50vw] md:max-h-[66vh] m-auto'>
              <Image
                src={slide.src}
                alt='Full view'
                fill
                className='object-contain'
                sizes='50vw'
              />
            </div>
          ),
        }}
      />
    </section>
  );
};
