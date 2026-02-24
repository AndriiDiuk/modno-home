import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./Button";

interface ProductCardProps {
  image: string;
  title: string;
  category?: string;
  price: string | number;
  oldPrice?: string | number;
  buttonLabel?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md";
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
  href,
  onClick,
  className = "",
  size = "md",
}) => {
  // Format price helper
  const formatPrice = (p: string | number) => {
    if (typeof p === "number") {
      return p.toLocaleString("ru-RU") + " ₽";
    }
    return p;
  };

  const cardSize = {
    sm: {
      image: "h-[154px] md:h-[208px]",
      title: "text-[27px] md:text-[40px]",
      category: "text-[14px]",
      titleWrap: "top-4 md:top-8",
      price: "text-[18px]",
      oldPrice: "text-[10px]",
      priceWrap:
        "p-[10px] flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4 text-center md:text-left",
      button: "!text-[12px] whitespace-nowrap px-2 !py-1 md:!p-2",
    },
    md: {
      image: "h-72",
      title: "text-[36px] sm:text-[50px]",
      category: "text-[14px] md:text-[18px]",
      titleWrap: "top-8",
      price: "text-[24px]",
      oldPrice: "text-[14px]",
      priceWrap:
        "p-5 md:p-5 flex flex-row items-center justify-between gap-1 md:gap-4 lg:gap-7",
      button: "!text-[12px] whitespace-nowrap px-2 !py-3 md:!p-2",
    },
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[10px] border border-brand-border overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group ${className}`}
    >
      {/* Image and Title Section */}
      <div
        className={`relative ${cardSize[size].image} w-full bg-brand-light-gray flex flex-col items-center justify-center overflow-hidden`}
      >
        <div
          className={`absolute ${cardSize[size].titleWrap} left-0 w-full text-center z-10`}
        >
          <span
            className={`${cardSize[size].category} text-brand-muted  block`}
          >
            {category}
          </span>
          <h3
            className={`${cardSize[size].title} font-light leading-[1.1] text-brand-black transition-transform duration-500 group-hover:scale-105`}
          >
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
      <div className={`mt-auto  leading-[1.1] ${cardSize[size].priceWrap}`}>
        <div className='flex flex-col'>
          {oldPrice && (
            <span
              className={` text-brand-muted line-through decoration-brand-black/30 ${cardSize[size].oldPrice}`}
            >
              {formatPrice(oldPrice)}
            </span>
          )}
          <span
            className={`font-bold text-brand-black whitespace-nowrap ${cardSize[size]?.price}`}
          >
            <span className='font-medium mr-1'>от</span>
            {formatPrice(price)}
          </span>
        </div>
        <div className='w-fit'>
          {href ? (
            <Link href={href} onClick={(e) => e.stopPropagation()}>
              <Button
                size='sm'
                label={buttonLabel}
                variant='light'
                className={` ${cardSize[size].button}`}
              />
            </Link>
          ) : (
            <Button
              size='sm'
              label={buttonLabel}
              variant='light'
              className={` ${cardSize[size].button}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
