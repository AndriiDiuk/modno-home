import {
  CalculationSection,
  ContactUsSection,
  DownloadCatalog,
  ProductSections,
  ReviewSection,
  VideoSection,
} from "@/components/sections";
import { getCachedHome, getCachedSettings } from "@/lib/payload";

const MOCK_VIDEOS = [
  {
    id: 1,
    title: "Обзор этой модели",
    overlayText: "в интерьере",
    views: 49,
    image: "/images/video-card/home/1.webp",
    video: "/sofas/Easy/1.mp4",
  },
  {
    id: 2,
    title: "Про ткани",
    overlayText: "ткани",
    views: 37,
    image: "/images/video-card/home/2.webp",
    video: "/sofas/2.mp4",
  },
  {
    id: 3,
    title: "Каркас из фанеры E1",
    overlayText: "каркас",
    views: 64,
    image: "/images/video-card/home/3.webp",
    video: "/sofas/3.mp4",
  },
  {
    id: 4,
    title: "Про мягкость",
    overlayText: "мягкость",
    views: 64,
    image: "/images/video-card/home/4.webp",
    video: "/sofas/4.mp4",
  },
  {
    id: 5,
    title: "Обзор производства",
    overlayText: "производство",
    views: 64,
    image: "/images/video-card/home/5.webp",
    video: "/sofas/5.mp4",
  },
];

export default async function HomePage() {
  const homeData = await getCachedHome();
  const settingsData = await getCachedSettings();
  const { sofasSection, catalogSection } = homeData || {};
  const socials = (settingsData as any)?.header?.socials || {};
  const {
    title = "Каталог диванов",
    subtitle = "Которые украсят ваш интерьер",
    selectedSofas = [],
  } = sofasSection || {};

  const {
    title: catalogTitle,
    subtitle: catalogSubtitle,
    buttonLabel: catalogButton,
    edition: catalogEdition,
  } = catalogSection || {};

  const products = (selectedSofas || []).map((sofa: any) => ({
    id: sofa.id,
    title: sofa.title,
    category: sofa.category,
    image: `/images/cards/${sofa.imageFilename}`,
    price: sofa.price,
    oldPrice: sofa.oldPrice,
  }));

  return (
    <div>
      <VideoSection
        title='Короткие видео'
        subtitle='В интерьере, на производстве, каркас и ткани'
        videos={MOCK_VIDEOS}
        className='pt-[120px] md:pt-[160px]'
      />
      <DownloadCatalog
        title={catalogTitle}
        subtitle={catalogSubtitle}
        buttonLabel={catalogButton}
        edition={catalogEdition}
      />
      <ProductSections title={title} subtitle={subtitle} products={products} />
      <CalculationSection />
      <ReviewSection />
      <ContactUsSection telegramUrl={socials.telegram} vkUrl={socials.vk} />
    </div>
  );
}
