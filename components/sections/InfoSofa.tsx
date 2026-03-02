import { CheckIcon } from "@/assets/icons";
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
  className?: string;
}

const DottedLine = () => (
  <span className='flex-1 border-b border-dotted border-brand-gray/40 mx-1 mb-[3px]' />
);

export const InfoSofa: React.FC<InfoSofaProps> = ({
  equipment,
  sizes,
  materials,
  price,
  oldPrice,
  ctaText = "Узнать стоимость своего размера за 5 мин.",
  className = "",
}) => {
  const formattedPrice = Number(price).toLocaleString("ru-RU");
  const formattedOldPrice = oldPrice
    ? Number(oldPrice).toLocaleString("ru-RU")
    : null;

  return (
    <div
      className={`w-full sm:w-[410px] bg-white rounded-[20px] p-5 ${className}`}
    >
      {/* Комплектация */}
      <div className='mb-6'>
        <h3 className='text-[16px]  font-bold text-center text-brand-black mb-4'>
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
        <h3 className='text-[16px]  font-bold text-center text-brand-black mb-4'>
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
      <div className='mb-6'>
        <h3 className='text-[16px]  font-bold text-center text-brand-black mb-4'>
          Какие материалы?
        </h3>
        <div className='flex flex-col gap-2'>
          {materials.map((material, index) => (
            <div
              key={index}
              className='flex items-start gap-2 text-brand-black'
            >
              <CheckIcon />
              <p className='text-[13px] md:text-[14px] leading-snug text-[#383838]'>
                <span className='font-semibold'>{material.label}</span> —{" "}
                {material.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Цена */}
      <div className='text-center mb-[10px] bg-[#F8F9FB] rounded-[8px] p-5'>
        {formattedOldPrice && (
          <p className='text-[16px] text-brand-gray line-through mb-1'>
            Стоимость {formattedOldPrice} руб.
          </p>
        )}
        <p className='text-[24px] md:text-[28px] font-bold text-brand-black'>
          от {formattedPrice} руб.
        </p>
      </div>

      {/* CTA Button */}
      <div className='mb-[10px]'>
        <Link
          href='#calculation'
          className='animate-shine w-full bg-brand-yellow min-w-0 md:min-w-0 text-center md:text-[17px] font-bold text-brand-black flex items-center justify-center px-10 py-4 rounded-[8px]'
        >
          Узнать стоимость своего размера за 5 мин.
        </Link>
      </div>

      {/* Footer text */}
      <p className='text-[11px] md:text-[12px] text-brand-black text-center leading-snug'>
        Мы знаем, что наши клиенты не любят звонки,
        <br />
        поэтому связь в <span className='font-semibold'>Vk</span> или{" "}
        <span className='font-semibold'>Telegram</span>
      </p>
    </div>
  );
};
