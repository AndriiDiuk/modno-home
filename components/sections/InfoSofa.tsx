import { CheckIcon } from "@/assets/icons";
import { SocialCallout } from "@/components/ui";
import Link from "next/link";
import React from "react";

interface SizeOption {
  label: string;
  value: string;
}

interface Material {
  label: string;
  value: string;
}

interface InfoSofaProps {
  equipment: string;
  sizes: SizeOption[];
  materials: Material[];
  price: number;
  oldPrice?: number;
  ctaText?: string;
  socials?: { telegram?: string; vk?: string };
  className?: string;
}

const DottedLine = () => (
  <span className='flex-1 border-b border-dotted border-brand-gray/40 mx-1 mb-0.75' />
);

export const InfoSofa: React.FC<InfoSofaProps> = ({
  equipment,
  sizes,
  materials,
  price,
  oldPrice,
  ctaText = "Узнать стоимость своего размера за 5 мин.",
  socials,
  className = "",
}) => {
  const formattedPrice = Number(price).toLocaleString("ru-RU");
  const formattedOldPrice = oldPrice
    ? Number(oldPrice).toLocaleString("ru-RU")
    : null;

  return (
    <div
      className={`flex flex-col justify-center w-full sm:w-102.5 min-h-140.5 bg-white rounded-[20px] p-5 leading-[1.2] shadow-[0_4px_68px_0_rgba(0,0,0,0.1)] ${className}`}
    >
      {/* Комплектация */}
      <div className='mb-6'>
        <h3 className='text-[16px]  font-bold text-center text-brand-black mb-2.5'>
          Комплектация
        </h3>
        <div className='flex items-start gap-2 text-brand-black'>
          <CheckIcon />
          <p className='text-[13px] md:text-[14px] leading-snug text-[#383838]'>
            {equipment}
          </p>
        </div>
      </div>

      {/* Варианты размеров */}
      <div className='mb-6'>
        <h3 className='text-[16px]  font-bold text-center text-brand-black mb-2.5'>
          Варианты размеров
        </h3>
        <div className='flex flex-col gap-2'>
          {sizes.map((size, index) => (
            <div key={index} className='flex items-end gap-2'>
              <CheckIcon />
              <span className='text-[13px] md:text-[14px] font-semibold whitespace-nowrap  text-brand-black'>
                {size.label}:
              </span>
              <DottedLine />
              <span className='text-[13px] md:text-[14px] whitespace-nowrap text-[#383838]'>
                {size.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Какие материалы? */}
      <div className='mb-7'>
        <h3 className='text-[16px]  font-bold text-center text-brand-black mb-2.5'>
          Какие материалы?
        </h3>
        <div className='flex flex-col gap-2'>
          {materials.map((material, index) => (
            <div
              key={index}
              className='flex items-start gap-2 text-brand-black'
            >
              <CheckIcon />
              <p className='text-[13px] md:text-[14px] leading-[1.2] text-[#383838] whitespace-nowrap'>
                <span className='font-semibold whitespace-nowrap'>
                  {material.label}
                </span>{" "}
                — {material.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Цена */}
      <div className='text-center mb-2.5 bg-[#F8F9FB] rounded-lg p-3 mx-4.5'>
        {formattedOldPrice && (
          <>
            <span className='text-[16px] text-brand-gray inline-block mb-1 mr-1.5'>
              Стоимость:{" "}
            </span>
            <span className='text-[16px] text-brand-gray  inline-block line-through mb-1.5 '>
              {formattedOldPrice} руб.
            </span>
          </>
        )}
        <p className='text-[24px] md:text-[28px] font-bold text-brand-black leading-[0.8]'>
          от {formattedPrice} руб.
        </p>
      </div>

      {/* CTA Button */}
      <div className='mb-2.5 mx-4.5'>
        <Link
          href='#calculation'
          className='animate-shine w-full bg-brand-yellow min-w-0 md:min-w-0 text-center md:text-[17px] font-bold text-brand-black flex items-center justify-center px-12 py-3 rounded-lg'
        >
          {ctaText}
        </Link>
      </div>

      {/* Footer text */}
      <SocialCallout
        socials={socials}
        className='text-[11px] md:text-[12px] leading-none'
      />
    </div>
  );
};
