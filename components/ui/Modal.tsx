"use client";

import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const DURATION = 200;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "max-w-[500px]",
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
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
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm duration-200 ${open ? "animate-in fade-in" : "animate-out fade-out"}`}
    >
      <div className='absolute inset-0' onClick={onClose} />
      <div
        className={`relative bg-white rounded-[20px] w-full overflow-hidden shadow-2xl duration-200 ${open ? "animate-in zoom-in-95 slide-in-from-bottom-4" : "animate-out zoom-out-95 slide-out-to-bottom-4"} ${className}`}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 p-2 text-brand-black/40 hover:text-brand-black transition-colors z-10 cursor-pointer'
        >
          <svg
            width='24'
            height='24'
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
        <div className='p-8 md:p-10'>{children}</div>
      </div>
    </div>
  );
};
