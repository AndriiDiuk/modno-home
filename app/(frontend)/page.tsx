import { getCachedHome, getCachedSettings } from "@/lib/payload";
import dynamic from "next/dynamic";

const HomeHero = dynamic(() =>
  import("@/components/sections/HomeHero").then((m) => m.HomeHero),
);
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
  const { heroSection, sofasSection, catalogSection } = homeData || {};
  const hero = heroSection || {};
  const titleBold = hero.titleBold
    ? hero.titleBold.split(",").map((s: string) => s.trim())
    : undefined;
  const title2Bold = hero.title2Bold
    ? hero.title2Bold.split(",").map((s: string) => s.trim())
    : undefined;
  const descriptionBold = hero.descriptionBold
    ? hero.descriptionBold.split(",").map((s: string) => s.trim())
    : undefined;

  const socials = (settingsData as any)?.header?.socials || {};
  const phone = (settingsData as any)?.header?.phone || "";
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
      <HomeHero
        phone={phone}
        socials={socials}
        {...(heroSection || {})}
        titleBold={titleBold}
        title2Bold={title2Bold}
        descriptionBold={descriptionBold}
      />

      {videos.length > 0 && (
        <VideoSection
          title={videoTitle}
          subtitle={videoSubtitle}
          videos={videos}
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
