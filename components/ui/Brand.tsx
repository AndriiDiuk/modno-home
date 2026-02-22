import { Logo } from "@/assets/icons";
import Link from "next/link";
import React from "react";

interface BrandProps {
  description?: string;
  className?: string;
  logoWidth?: number;
  logoHeight?: number;
  showDescription?: boolean;
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
  showDescription = false,
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
          <div
            className={`md:h-12 h-8 w-px bg-brand-black ${showDescription ? "block" : "hidden"} xl:block ml-2`}
          />
          <p
            className={`text-[10px] md:text-[13px] max-w-[190px] md:max-w-[250px] leading-[1.4] ${showDescription ? "block" : "hidden"} xl:block`}
          >
            {description}
          </p>
        </>
      )}
    </div>
  );
};
