"use client";

import { ConfigCard, SectionTitle } from "@/components/ui";
import React from "react";
import { useModal } from "../providers/ModalProvider";

interface ConfigSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const CONFIGS = [
  {
    image: "/sofas/Easy/config-1.webp",
    title: "С двумя подлокотниками",
    dimensions: "2000x1550x700",
    price: 104900,
    oldPrice: 144900,
  },
  {
    image: "/sofas/Easy/config-2.webp",
    title: "Сидушка с выступом",
    dimensions: "2000x1550x700",
    price: 102900,
    oldPrice: 141000,
  },
  {
    image: "/sofas/Easy/config-3.webp",
    title: "Оттоманка и сидушка с выступом",
    dimensions: "2000x1550x700",
    price: 105900,
    oldPrice: 146000,
  },
  {
    image: "/sofas/Easy/config-4.webp",
    title: "С приставным пуфом",
    subtitle: "(можно использовать для спального места)",
    dimensions: "2000x1550x700",
    price: 112900,
    oldPrice: 162000,
  },
];

export const ConfigSection: React.FC<ConfigSectionProps> = ({
  title = "ПОПУЛЯРНЫЕ КОНФИГУРАЦИИ",
  subtitle = "Все параметры можно менять под себя",
  className = "",
}) => {
  const { openModal } = useModal();

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
          {CONFIGS.map((config, index) => (
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
