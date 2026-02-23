"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

interface VideoCardProps {
  image: string;
  video?: string;
  title: string;
  overlayText: string;
  views: string | number;
  onClick: () => void;
  className?: string;
}

/**
 * Video Card component for reviews/previews.
 * On hover: hides thumbnail and plays the video.
 * On mouse leave: pauses video and shows thumbnail again.
 * On click: triggers onClick (e.g., open modal).
 */
export const VideoCard: React.FC<VideoCardProps> = ({
  image,
  video,
  title,
  overlayText,
  views,
  onClick,
  className = "",
}) => {
  const viewsText =
    typeof views === "number" ? `${views} тыс. просмотров` : views;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!video) return;
    setIsHovered(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (!video) return;
    setIsHovered(false);
    videoRef.current?.pause();
  };

  return (
    <div className={`flex flex-col group ${className}`}>
      {/* Video Preview Section */}
      <div
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='relative aspect-[9/16] w-full rounded-[8px] overflow-hidden cursor-pointer shadow-sm'
      >
        {/* Thumbnail Image */}
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
            isHovered && video ? "opacity-0" : "opacity-100"
          } transition-opacity`}
          sizes='(max-width: 768px) 100vw, 33vw'
        />

        {/* Video Element (hidden until hover) */}
        {video && (
          <video
            ref={videoRef}
            src={video}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            muted
            playsInline
            loop
            preload='none'
          />
        )}

        {/* Dark overlay for text readability */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isHovered && video
              ? "bg-transparent"
              : "bg-black/10 group-hover:bg-black/20"
          }`}
        />

        {/* Centered Overlay Text */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-6 text-center transition-opacity duration-300 ${
            isHovered && video ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className='text-white text-[20px] md:text-base font-bold leading-tight drop-shadow-lg'>
            {overlayText}
          </p>
        </div>

        {/* Mobile Info Overlay (Visible only on mobile) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden transition-opacity duration-300 ${
            isHovered && video ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`absolute bottom-5 left-3 right-6 flex flex-col items-start text-white md:hidden max-w-[60%] transition-opacity duration-300 ${
            isHovered && video ? "opacity-0" : "opacity-100"
          }`}
        >
          <h3 className='text-[18px] font-bold leading-tight'>{title}</h3>
        </div>
      </div>

      {/* Info Section (Visible only on desktop/tablet) */}
      <div className='mt-4 hidden md:flex flex-col gap-1'>
        <h3 className='text-[20px] md:text-base font-extrabold text-brand-black leading-[1.2] transition-colors duration-300  md:max-w-[140px] break-words line-clamp-2'>
          {title}
        </h3>
        <p className='text-[16px] md:text-sm text-brand-muted font-light'>
          {viewsText}
        </p>
      </div>
    </div>
  );
};
