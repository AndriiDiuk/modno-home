"use client";

import { SectionTitle } from "@/components/ui";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import React from "react";

const REVIEWS = [
  { id: 1, image: "/images/reviews/1 282 1.webp" },
  { id: 2, image: "/images/reviews/1 282 2.webp" },
  { id: 3, image: "/images/reviews/1 282 3.webp" },
  { id: 4, image: "/images/reviews/1 282 4.webp" },
  { id: 5, image: "/images/reviews/1 282 5.webp" },
  { id: 6, image: "/images/reviews/1 282 6.webp" },
  { id: 7, image: "/images/reviews/1 282 7.webp" },
  { id: 8, image: "/images/reviews/1 282 8.webp" },
  { id: 9, image: "/images/reviews/1 282 9.webp" },
];

interface ReviewSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  title = "Отзывы",
  className = "",
}) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.3,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
  });

  return (
    <section
      className={`w-full py-10 md:py-18 overflow-hidden bg-brand-light-gray ${className}`}
    >
      <div className='content flex flex-col items-center'>
        <SectionTitle
          title={title}
          className='text-center mb-[35px] md:mb-10'
        />

        <div className='relative w-full group'>
          <div ref={sliderRef} className='keen-slider w-full !px-0'>
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className='keen-slider__slide flex justify-center'
              >
                <div className='relative w-full h-[500px] max-w-[350px] overflow-hidden'>
                  <Image
                    src={review.image}
                    alt={`Review ${review.id}`}
                    fill
                    className='object-contain shadow-md'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className='flex justify-center gap-4 mt-8'>
            <button
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              className='w-12 h-12 rounded-full border border-brand-black/20 flex items-center justify-center hover:bg-brand-black hover:text-white transition-all cursor-pointer group/btn'
              aria-label='Previous slide'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='rotate-180'
              >
                <path
                  d='M9 5L16 12L9 19'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <button
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              className='w-12 h-12 rounded-full border border-brand-black/20 flex items-center justify-center hover:bg-brand-black hover:text-white transition-all cursor-pointer group/btn'
              aria-label='Next slide'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 5L16 12L9 19'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
