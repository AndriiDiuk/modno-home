"use client";

import React, { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const DURATION = 200;

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isOpen) {
      setMounted(true);
      setHasAnimated(false);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setOpen(true);
        setHasAnimated(true);
      }));
    } else {
      setOpen(false);
      timeoutRef.current = setTimeout(() => setMounted(false), DURATION);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      const header = document.querySelector("header");
      if (header) header.style.paddingRight = `${scrollbarWidth}px`;
      setIsBuffering(true);
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.load();
        video.play().catch(() => {});
      }
    } else {
      setTimeout(() => {
        document.body.style.overflow = "unset";
        document.body.style.paddingRight = "0px";
        const header = document.querySelector("header");
        if (header) header.style.paddingRight = "";
      }, DURATION);
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      const header = document.querySelector("header");
      if (header) header.style.paddingRight = "";
    };
  }, [isOpen, videoSrc]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md duration-200 ${open ? "animate-in fade-in" : hasAnimated ? "animate-out fade-out" : "opacity-0"}`}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className='absolute top-6 right-6 text-white hover:opacity-70 transition-opacity cursor-pointer p-2 z-10'
        aria-label='Close video'
      >
        <svg width='32' height='32' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M18 6L6 18M6 6L18 18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>

      <div
        className={`relative w-full max-w-[400px] mx-4 duration-200 ${open ? "animate-in zoom-in-95 slide-in-from-bottom-4" : hasAnimated ? "animate-out zoom-out-95 slide-out-to-bottom-4" : "opacity-0 scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
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
