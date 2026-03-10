import React from "react";

interface DoubleChevronIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const DoubleChevronIcon: React.FC<DoubleChevronIconProps> = ({
  className,
  width = 20,
  height = 19,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M0 0L10 7.08955L20 0V3.47388L10 10.5634L0 3.47388V0ZM0 8.43657L10 15.5261L20 8.43657V11.9104L10 19L0 11.9104V8.43657Z'
        fill='currentColor'
      />
    </svg>
  );
};
