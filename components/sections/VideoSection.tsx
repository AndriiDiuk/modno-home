"use client";

import { VideoModal } from "@/components/common/VideoModal";
import { SectionTitle, VideoCard } from "@/components/ui";
import React, { useState } from "react";

interface VideoItem {
  id: string | number;
  title: string;
  overlayText: string;
  views: string | number;
  image: string;
  video?: string;
}

interface VideoSectionProps {
  title: string;
  subtitle?: string;
  videos: VideoItem[];
  className?: string;
}

/**
 * Section displaying a collection of short videos in a responsive horizontal-scroll or grid.
 * Features a centered SectionTitle and 5-column layout on desktop.
 */
export const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  subtitle,
  videos,
  className = "",
}) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section className={`w-full py-10 md:py-18 ${className}`}>
        <div className='content flex flex-col items-center'>
          {/* Centered Title */}
          <SectionTitle
            title={title}
            subtitle={subtitle}
            className='text-center mb-[35px] md:mb-10'
            subtitleClassName='text-[18px] md:text-[30px]'
          />

          {/* Video Grid - 5 columns on desktop, 4 on mobile/tablet */}
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 w-full'>
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={index >= 4 ? "hidden lg:block" : "block"}
              >
                <VideoCard
                  title={video.title}
                  overlayText={video.overlayText}
                  views={video.views}
                  image={video.image}
                  video={video.video}
                  onClick={() => {
                    if (video.video) {
                      setActiveVideo(video.video);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoSrc={activeVideo || ""}
      />
    </>
  );
};
