"use client";

import React, { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

/**
 * Full-screen video modal overlay.
 * Plays the video automatically when opened and pauses when closed.
 * Shows loading spinner while video buffers enough to play.
 */
export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsBuffering(true);
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.load();
        video.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = "unset";
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, videoSrc]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md'
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className='absolute top-6 right-6 text-white hover:opacity-70 transition-opacity cursor-pointer p-2 z-10'
        aria-label='Close video'
      >
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18 6L6 18M6 6L18 18'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {/* Video Container */}
      <div
        className='relative w-full max-w-[400px] mx-4'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner — visible while video buffers */}
        {isBuffering && (
          <div className='absolute inset-0 flex items-center justify-center z-10'>
            <div className='w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin' />
          </div>
        )}

        <video
          ref={videoRef}
          src={videoSrc}
          className='w-full rounded-2xl shadow-2xl'
          controls
          playsInline
          autoPlay
          preload='auto'
          onCanPlay={() => setIsBuffering(false)}
        />
      </div>
    </div>
  );
};
