"use client";

import { ProductCard, SectionTitle } from "@/components/ui";
import React from "react";
import { useModal } from "../providers/ModalProvider";

interface Product {
  id: string | number;
  title: string;
  category?: string;
  price: string | number;
  oldPrice?: string | number;
  image: string;
}

interface OtherCardsProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  className?: string;
}

export const OtherCardsSection: React.FC<OtherCardsProps> = ({
  title = "Другие модели диванов",
  subtitle = "Выбирайте подходящий для себя",
  products,
  className = "",
}) => {
  const { openModal } = useModal();

  if (!products || products.length === 0) return null;

  return (
    <section className={`w-full py-16 md:py-24 ${className}`}>
      <div className='content'>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          className='text-center mb-12'
        />

        <div className='grid grid-cols-2  lg:grid-cols-4 gap-6 md:gap-8 w-full'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              image={product.image}
              price={product.price}
              oldPrice={product.oldPrice}
              onClick={() =>
                openModal(`Узнать когда будет ${product.title}`, "ЖДУ ЗВОНКА")
              }
              buttonLabel='Узнать когда будет'
              size='sm'
            />
          ))}
        </div>
      </div>
    </section>
  );
};
