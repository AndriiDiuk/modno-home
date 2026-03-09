import { getCachedHome, getCachedSettings } from "@/lib/payload";
import dynamic from "next/dynamic";

const VideoSection = dynamic(() =>
  import("@/components/sections/VideoSection").then((m) => m.VideoSection),
);
const DownloadCatalog = dynamic(() =>
  import("@/components/sections/DownloadCatalog").then(
    (m) => m.DownloadCatalog,
  ),
);
const ProductSections = dynamic(() =>
  import("@/components/sections/ProductSections").then(
    (m) => m.ProductSections,
  ),
);
const CalculationSection = dynamic(() =>
  import("@/components/sections/CalculationSection").then(
    (m) => m.CalculationSection,
  ),
);
const ReviewSection = dynamic(() =>
  import("@/components/sections/ReviewSection").then((m) => m.ReviewSection),
);
const ContactUsSection = dynamic(() =>
  import("@/components/sections/ContactUsSection").then(
    (m) => m.ContactUsSection,
  ),
);

export default async function HomePage() {
  const [homeData, settingsData] = await Promise.all([
    getCachedHome(),
    getCachedSettings(),
  ]);
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

  const { videoSection } = homeData || {};
  const {
    title: videoTitle = "Короткие видео",
    subtitle: videoSubtitle = "В интерьере, на производстве, каркас и ткани",
    videos: rawVideos = [],
  } = videoSection || {};

  const videos = (rawVideos as any[]).map((v: any, i: number) => ({
    id: i + 1,
    title: v.title,
    overlayText: v.overlayText || "",
    views: v.views || 0,
    image: "",
    video: v.videoUrl,
  }));

  const products = (selectedSofas || []).map((sofa: any) => ({
    id: sofa.id,
    title: sofa.title,
    category: sofa.category,
    image: `/images/cards/${sofa.imageFilename}`,
    price: sofa.price,
    oldPrice: sofa.oldPrice,
  }));

  return (
    <div className='show-slow'>
      {videos.length > 0 && (
        <VideoSection
          title={videoTitle}
          subtitle={videoSubtitle}
          videos={videos}
          className='pt-30 md:pt-40'
        />
      )}
      <DownloadCatalog
        title={catalogTitle}
        subtitle={catalogSubtitle}
        buttonLabel={catalogButton}
        edition={catalogEdition}
      />
      <ProductSections title={title} subtitle={subtitle} products={products} />
      <CalculationSection socials={socials} />
      <ReviewSection />
      <ContactUsSection telegramUrl={socials.telegram} vkUrl={socials.vk} />
    </div>
  );
}
