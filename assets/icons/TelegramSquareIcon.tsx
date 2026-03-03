"use client";

import React, { useId } from "react";

interface TelegramSquareIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const TelegramSquareIcon: React.FC<TelegramSquareIconProps> = ({
  className,
  width = 35,
  height = 35,
}) => {
  const uid = useId();
  const gradientId = `tg-sq-grad-${uid}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 35 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect width='33' height='33' rx='16.5' fill='#419FD9' />
      <rect width='35' height='35' rx='6' fill={`url(#${gradientId})`} />
      <path
        d='M25.9131 9.38794C25.9209 9.38446 27.3916 8.72866 27.417 9.82153L24.1807 26.0793C24.1807 26.0793 23.7212 27.2004 22.498 26.6653L17.9111 23.1487L14.9551 25.8245C14.9493 25.8289 14.7231 26.0018 14.4717 25.9016C14.4717 25.9016 14.2421 25.8754 13.9873 25.0344C13.7068 24.1673 12.3311 19.6575 12.3311 19.6575L7.76953 18.1292C7.76953 18.1292 7.08149 17.8741 7.00488 17.3391C6.92843 16.804 7.79492 16.4983 7.79492 16.4983L25.9131 9.38794ZM23.9004 12.7014C23.9259 12.3192 23.2891 12.7014 23.2891 12.7014L13.2744 19.0715C13.1215 19.1735 13.0701 19.3522 13.1211 19.5051L14.3193 23.429C14.3958 23.6583 14.7264 23.633 14.7773 23.3782L15.0576 20.9827C15.0577 20.8809 15.1092 20.8041 15.1855 20.7532C16.1548 19.886 23.3626 13.4166 23.6709 13.1086C24.0022 12.7519 23.9004 12.7014 23.9004 12.7014Z'
        fill='white'
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1='15.7538'
          y1='20.8144'
          x2='42.6771'
          y2='4.24432'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.0378357' stopColor='#23A0DC' />
          <stop offset='0.447375' stopColor='#6ACFFF' />
          <stop offset='0.752116' stopColor='#93DCFF' />
        </linearGradient>
      </defs>
    </svg>
  );
};
