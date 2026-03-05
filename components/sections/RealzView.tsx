"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  const slides = images.map((src) => ({ src }));

  // Reset padding-right that lightbox adds (scrollbar-gutter handles it)
  useEffect(() => {
    if (selectedIndex >= 0) {
      document.body.style.paddingRight = "0px";
    }
  }, [selectedIndex]);

  return (
    <section className={`w-full ${className}`}>
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

      <Lightbox
        open={selectedIndex >= 0}
        index={selectedIndex}
        close={() => setSelectedIndex(-1)}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(12px)" },
        }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full max-w-[90vw] max-h-[80vh] md:max-w-[50vw] md:max-h-[66vh] m-auto">
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
