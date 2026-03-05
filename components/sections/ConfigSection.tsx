"use client";

import { ConfigCard, SectionTitle } from "@/components/ui";
import React from "react";
import { useModal } from "../providers/ModalProvider";

interface ConfigItem {
  image: string;
  title: string;
  subtitle?: string;
  dimensions?: string;
  price: number;
  oldPrice?: number;
}

interface ConfigSectionProps {
  title?: string;
  subtitle?: string;
  configs?: ConfigItem[];
  className?: string;
}

export const ConfigSection: React.FC<ConfigSectionProps> = ({
  title = "ПОПУЛЯРНЫЕ КОНФИГУРАЦИИ",
  subtitle = "Все параметры можно менять под себя",
  configs = [],
  className = "",
}) => {
  const { openModal } = useModal();

  if (configs.length === 0) return null;

  return (
    <section className={`w-full py-10 md:py-16 bg-[#F5F5F5] ${className}`}>
      <div className='content'>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          className='text-center mb-12 md:mb-16'
          titleClassName='text-[28px] md:text-[42px] font-bold'
          subtitleClassName='text-[18px] md:text-[30px] '
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {configs.map((config, index) => (
            <ConfigCard
              key={index}
              {...config}
              onClick={() =>
                openModal(`Узнать подробнее о модели ${config.title}`)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};
