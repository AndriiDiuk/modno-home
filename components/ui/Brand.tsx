import { Logo } from "@/assets/icons";
import Link from "next/link";
import React from "react";

interface BrandProps {
  description?: string;
  className?: string;
  logoWidth?: number;
  logoHeight?: number;
}

/**
 * Brand component that displays the logo and an optional description separated by a vertical line.
 * Used in both Header and Footer.
 */
export const Brand: React.FC<BrandProps> = ({
  description,
  className = "",
  logoWidth = 150,
  logoHeight = 35,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link href='/' className='flex flex-col'>
        <Logo
          width={logoWidth}
          height={logoHeight}
          className='max-w-[150px] md:max-w-[174px] w-full'
        />
      </Link>

      {description && (
        <>
          <div className='h-12 w-px bg-brand-black hidden xl:block ml-2' />
          <p className='text-[13px] max-w-[250px] leading-[1.4] hidden xl:block'>
            {description}
          </p>
        </>
      )}
    </div>
  );
};
