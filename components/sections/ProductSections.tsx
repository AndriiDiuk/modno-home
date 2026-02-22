"use client";

import { ProductCard, SectionTitle } from "@/components/ui";
import React from "react";

interface Product {
  id: string | number;
  title: string;
  category?: string;
  price: string | number;
  oldPrice?: string | number;
  image: string;
}

interface ProductSectionsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  className?: string;
}

/**
 * Section displaying a collection of products in a responsive grid.
 * Features a centered SectionTitle and an adaptive 3-column grid.
 */
export const ProductSections: React.FC<ProductSectionsProps> = ({
  title,
  subtitle,
  products,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product.title);
    // Add logic here (e.g., open modal or navigate)
  };

  const hasMore = products.length > 3;

  return (
    <section className={`w-full py-16 md:py-24 ${className}`}>
      <div className='content flex flex-col items-center'>
        {/* Centered Title */}
        <SectionTitle
          title={title}
          subtitle={subtitle}
          className='text-center mb-12 md:mb-16'
        />

        {/* Responsive Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full'>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`${!isExpanded && index >= 3 ? "hidden md:block" : "block"}`}
            >
              <ProductCard
                title={product.title}
                category={product.category}
                image={product.image}
                price={product.price}
                oldPrice={product.oldPrice}
                onClick={() => handleProductClick(product)}
              />
            </div>
          ))}
        </div>

        {/* Show More Button - Only visible on mobile (hidden on md and up) */}
        {hasMore && !isExpanded && (
          <div className='mt-10 md:hidden w-full flex justify-center'>
            <button
              onClick={() => setIsExpanded(true)}
              className='w-full max-w-[340px] bg-brand-black text-white py-4 rounded-[12px] text-[16px] font-medium uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer'
            >
              СМОТРЕТЬ ЕЩЕ
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
