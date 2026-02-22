import { TelegramIcon, VkIcon } from "@/assets/icons";
import Link from "next/link";
import React from "react";

interface SocialLinksProps {
  socials: {
    telegram?: string;
    vk?: string;
  };
  className?: string;
}

/**
 * Reusable social media links component.
 * Renders Telegram and VK icons with links.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  socials,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.telegram && (
        <Link href={socials.telegram} target='_blank'>
          <TelegramIcon
            width={50}
            height={38}
            className='hover:opacity-80 transition-opacity'
          />
        </Link>
      )}
      {socials.vk && (
        <Link href={socials.vk} target='_blank'>
          <VkIcon
            width={50}
            height={38}
            className='hover:opacity-80 transition-opacity'
          />
        </Link>
      )}
    </div>
  );
};
