"use client";

import React, { useId } from "react";

interface TelegramIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: "gradient" | "white";
}

export const TelegramIcon: React.FC<TelegramIconProps> = ({
  className,
  width = 50,
  height = 38,
  variant = "gradient",
}) => {
  const uid = useId();
  const gradientId = `tg-grad-${uid}`;
  const clipId = `tg-clip-${uid}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={variant === "gradient" ? "0 0 50 38" : "15 11 20 16"}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath={variant === "gradient" ? `url(#${clipId})` : undefined}>
        {variant === "gradient" && (
          <rect width='50' height='38' rx='8' fill={`url(#${gradientId})`} />
        )}
        <path
          d='M32.2851 12.0947L16.3405 17.9598C15.2524 18.3767 15.2586 18.9556 16.1409 19.2139L20.2345 20.432L29.7059 14.7317C30.1537 14.4718 30.5628 14.6116 30.2265 14.8964L22.5529 21.5026L22.2705 25.5284C22.6842 25.5284 22.8667 25.3474 23.0987 25.1338L25.0871 23.2894L29.2229 26.2035C29.9855 26.6041 30.5332 26.3982 30.7229 25.5301L33.438 13.3248C33.7158 12.262 33.0125 11.7807 32.2851 12.0947Z'
          fill={variant === "gradient" ? "white" : "currentColor"}
        />
      </g>
      <defs>
        <linearGradient
          id={gradientId}
          x1='22.5054'
          y1='22.5984'
          x2='54.5328'
          y2='-3.33757'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.0378357' stopColor='var(--color-telegram-start)' />
          <stop offset='0.447375' stopColor='var(--color-telegram-mid)' />
          <stop offset='0.752116' stopColor='var(--color-telegram-end)' />
        </linearGradient>
        <clipPath id={clipId}>
          <rect width='50' height='38' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
