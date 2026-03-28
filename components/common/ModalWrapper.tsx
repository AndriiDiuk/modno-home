"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const DURATION = 200;

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
  className = "max-w-[500px]",
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 duration-200 ${open ? "animate-in fade-in" : hasAnimated ? "animate-out fade-out" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`relative w-full bg-white rounded-[20px] md:rounded-[30px] px-8 py-10 md:px-12 md:py-14 shadow-2xl duration-200 transition-[max-width] ${open ? "animate-in zoom-in-95 slide-in-from-bottom-4" : hasAnimated ? "animate-out zoom-out-95 slide-out-to-bottom-4" : "opacity-0 scale-95"} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-brand-black hover:opacity-70 transition-opacity cursor-pointer p-2'
          aria-label='Close'
        >
          <svg
            width='24'
            height='24'
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

        {children}
      </div>
    </div>,
    document.body,
  );
};
