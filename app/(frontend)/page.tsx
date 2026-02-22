import { ProductSections, VideoSection } from "@/components/sections";
import { getCachedHome } from "@/lib/payload";

const MOCK_VIDEOS = [
  {
    id: 1,
    title: "Обзор этой модели",
    overlayText: "в интерьере",
    views: 49,
    image: "/images/video-card/home/1.webp",
  },
  {
    id: 2,
    title: "Про ткани",
    overlayText: "ткани",
    views: 37,
    image: "/images/video-card/home/2.webp",
  },
  {
    id: 3,
    title: "Каркас из фанеры E1",
    overlayText: "каркас",
    views: 64,
    image: "/images/video-card/home/3.webp",
  },
  {
    id: 4,
    title: "Про мягкость",
    overlayText: "мягкость",
    views: 64,
    image: "/images/video-card/home/4.webp",
  },
  {
    id: 5,
    title: "Обзор производства",
    overlayText: "производство",
    views: 64,
    image: "/images/video-card/home/5.webp",
  },
];

export default async function HomePage() {
  const homeData = await getCachedHome();
  const { sofasSection } = homeData || {};
  const {
    title = "Каталог диванов",
    subtitle = "Которые украсят ваш интерьер",
    selectedSofas = [],
  } = sofasSection || {};

  // Map Payload sofas to the format expected by ProductSections
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
      />
      <ProductSections title={title} subtitle={subtitle} products={products} />
    </div>
  );
}
