import Image from "next/image";
import React from "react";
import { Button } from "./Button";

interface ProductCardProps {
  image: string;
  title: string;
  category?: string;
  price: string | number;
  oldPrice?: string | number;
  buttonLabel?: string;
  onClick: () => void;
  className?: string;
}

/**
 * Product Card component for furniture.
 * Features an image with title overlay, prices, and an action button.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  category = "Диван",
  price,
  oldPrice,
  buttonLabel = "Узнать подробнее",
  onClick,
  className = "",
}) => {
  // Format price helper
  const formatPrice = (p: string | number) => {
    if (typeof p === "number") {
      return p.toLocaleString("ru-RU") + " ₽";
    }
    return p;
  };

  return (
    <div
      className={`bg-white rounded-[10px] border border-brand-border overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group ${className}`}
    >
      {/* Image and Title Section */}
      <div className='relative h-72 w-full bg-brand-light-gray flex flex-col items-center justify-center overflow-hidden'>
        <div className='absolute top-8 left-0 w-full text-center z-10'>
          <span className='text-[14px] md:text-[18px] text-brand-muted  block'>
            {category}
          </span>
          <h3 className='text-[36px] sm:text-[50px] font-light leading-[1.1] text-brand-black transition-transform duration-500 group-hover:scale-105'>
            {title}
          </h3>
        </div>

        <div className='relative w-full h-full  transition-transform duration-500 group-hover:scale-105'>
          <Image
            src={image}
            alt={`${category} ${title}`}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className='p-5 md:p-5 mt-auto flex flex-row items-center justify-between gap-1 md:gap-4 lg:gap-7 leading-[1.1]'>
        <div className='flex flex-col'>
          {oldPrice && (
            <span className='text-[14px]  text-brand-muted line-through decoration-brand-black/30'>
              {formatPrice(oldPrice)}
            </span>
          )}
          <span className='text-[24px] font-bold text-brand-black whitespace-nowrap'>
            <span className='text-[16px] md:text-[20px] font-medium mr-1'>
              от
            </span>
            {formatPrice(price)}
          </span>
        </div>
        <div className='w-fit'>
          <Button
            size='sm'
            label={buttonLabel}
            onClick={onClick}
            variant='light'
          />
        </div>
      </div>
    </div>
  );
};
