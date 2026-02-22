import { Logo, TelegramIcon, VkIcon } from "@/assets/icons";
import { Button, CircleCTA } from "@/components/ui";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  data: {
    logoSubtext?: string;
    logoDescription?: string;
    workingHours?: string;
    phone?: string;
    socials?: {
      telegram?: string;
      vk?: string;
    };
    stories?: Array<{
      text: string;
      image: any;
      link: string;
    }>;
  };
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const {
    logoSubtext = "фабрика современной мебели",
    logoDescription = "Производство модульных диванов в Челябинске с доставкой по РФ",
    workingHours = "Шоурум в Челябинске с 9:00 до 18:00",
    phone = "+7 (992) 503-54-99",
    socials = {},
    stories = [],
  } = data;

  return (
    <header className='w-full bg-white border-b border-gray-200 py-4'>
      <div className='container mx-auto px-4 flex items-center justify-between gap-8'>
        {/* Left: Logo and Description */}
        <div className='flex items-center gap-6'>
          <Link href='/' className='flex flex-col'>
            <Logo width={150} height={35} />
            <span className='text-[10px] text-gray-500 mt-1 uppercase tracking-wider font-medium'>
              {logoSubtext}
            </span>
          </Link>

          <div className='h-12 w-[1px] bg-gray-300 hidden xl:block' />

          <p className='text-xs text-gray-600 max-w-[200px] leading-tight hidden xl:block'>
            {logoDescription}
          </p>
        </div>

        {/* Center: Stories & Working Hours */}
        <div className='flex items-center gap-4 lg:gap-8'>
          {/* Stories */}
          <div className='hidden md:flex items-center gap-2'>
            {stories.map((story, index) => (
              <CircleCTA
                key={index}
                text={story.text}
                imageSrc={
                  typeof story.image === "object"
                    ? story.image.url
                    : story.image
                }
                onClick={() => (window.location.href = story.link)}
                className='scale-75 lg:scale-90'
              />
            ))}
          </div>

          {/* Working Hours */}
          <div className='hidden lg:flex flex-col text-right lg:text-left'>
            <p className='text-[13px] font-medium text-gray-800 leading-snug whitespace-pre-line'>
              {workingHours}
            </p>
          </div>
        </div>

        {/* Right: Socials, Phone, Button */}
        <div className='flex items-center gap-6'>
          {/* Social Icons */}
          <div className='hidden sm:flex items-center gap-3'>
            {socials.telegram && (
              <Link href={socials.telegram} target='_blank'>
                <TelegramIcon
                  width={40}
                  height={30}
                  className='hover:opacity-80 transition-opacity'
                />
              </Link>
            )}
            {socials.vk && (
              <Link href={socials.vk} target='_blank'>
                <VkIcon
                  width={40}
                  height={30}
                  className='hover:opacity-80 transition-opacity'
                />
              </Link>
            )}
          </div>

          {/* Contact Info & Call to Action */}
          <div className='flex flex-col items-end gap-1'>
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className='text-lg lg:text-xl font-bold text-gray-900'
            >
              {phone}
            </a>
            <Button
              label='Заказать звонок'
              variant='light'
              size='sm'
              className='text-[10px] py-2 px-6 h-auto'
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line (like in referenced image) */}
      <div className='container mx-auto px-4 mt-2'>
        <div className='h-[1px] w-full bg-gray-200' />
      </div>
    </header>
  );
};
