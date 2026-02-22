import Image from "next/image";
import React from "react";

interface VideoCardProps {
  image: string;
  title: string;
  overlayText: string;
  views: string | number;
  onClick: () => void;
  className?: string;
}

/**
 * Video Card component for reviews/previews.
 * Features an image with overlay text, a title below, and view count.
 */
export const VideoCard: React.FC<VideoCardProps> = ({
  image,
  title,
  overlayText,
  views,
  onClick,
  className = "",
}) => {
  const viewsText =
    typeof views === "number" ? `${views} тыс. просмотров` : views;

  return (
    <div className={`flex flex-col group ${className}`}>
      {/* Video Preview Section */}
      <div
        onClick={onClick}
        className='relative aspect-[9/16] w-full rounded-[8px] overflow-hidden cursor-pointer shadow-sm'
      >
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, 33vw'
        />

        {/* Dark overlay for text readability */}
        <div className='absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20' />

        {/* Centered Overlay Text (Always visible) */}
        <div className='absolute inset-0 flex items-center justify-center p-6 text-center'>
          <p className='text-white text-[20px] md:text-base font-bold leading-tight drop-shadow-lg'>
            {overlayText}
          </p>
        </div>

        {/* Mobile Info Overlay (Visible only on mobile) */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden' />
        <div className='absolute bottom-5 left-3 right-6 flex flex-col items-start text-white md:hidden max-w-[60%]'>
          <h3 className='text-[18px] font-bold leading-tight'>{title}</h3>
        </div>
      </div>

      {/* Info Section (Visible only on desktop/tablet) */}
      <div className='mt-4 hidden md:flex flex-col gap-1'>
        <h3 className='text-[20px] md:text-base font-extrabold text-brand-black leading-[1.2] transition-colors duration-300 group-hover:text-brand-gray md:max-w-[140px] break-words line-clamp-2'>
          {title}
        </h3>
        <p className='text-[16px] md:text-sm text-brand-muted font-light'>
          {viewsText}
        </p>
      </div>
    </div>
  );
};
