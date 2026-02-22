import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

/**
 * Reusable SectionTitle component with title and optional subtitle.
 * Designed to match the brand style with bold uppercase title and gray subtitle.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  titleClassName = "text-[32px] md:text-[50px]",
  subtitleClassName = "text-[18px] md:text-[34px] ",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <h2
        className={` font-bold uppercase text-brand-black leading-tight ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-light text-brand-gray  ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
