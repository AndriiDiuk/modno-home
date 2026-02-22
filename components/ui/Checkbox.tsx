import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

/**
 * Reusable Checkbox component with custom styling.
 * Supports a label as string or React node.
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${className}`}
    >
      <div className='relative flex items-center'>
        <input
          type='checkbox'
          className='peer appearance-none w-4 h-4 border border-brand-black/30 rounded-sm checked:bg-brand-dark transition-all cursor-pointer'
          {...props}
        />
        <svg
          className='absolute left-0 top-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none p-[2px]'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='4'
        >
          <polyline points='20 6 9 17 4 12'></polyline>
        </svg>
      </div>
      <span className='text-[11px] md:text-xs text-brand-black/50'>
        {label}
      </span>
    </label>
  );
};
