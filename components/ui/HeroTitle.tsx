import React from "react";

interface HeroTitleProps {
  topLine: string;
  bottomLine: string;
  description: string;
  topBold?: string[];
  bottomBold?: string[];
  descriptionBold?: string[];
  className?: string;
}

function highlightWords(text: string, bold: string[] = []) {
  if (!bold.length) return text;

  const pattern = bold
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    bold.includes(part) ? (
      <span key={i} className='font-bold'>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  topLine,
  bottomLine,
  description,
  topBold = [],
  bottomBold = [],
  descriptionBold = [],
  className = "",
}) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className='text-[24px] md:text-[32px] lg:text-[45px] text-brand-black leading-[1.1] '>
        {highlightWords(topLine, topBold)}
      </h1>
      <p className='text-[16px] md:text-[20px] lg:text-[33px] text-brand-black leading-[1.2]'>
        {highlightWords(bottomLine, bottomBold)}
      </p>
      <p className='text-[13px] md:text-[18px] text-brand-black leading-[1.2] mt-3 max-w-[565px] mx-auto '>
        {highlightWords(description, descriptionBold)}
      </p>
    </div>
  );
};
