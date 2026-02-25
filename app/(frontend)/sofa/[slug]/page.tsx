import {
  CalculationSection,
  ConfigSection,
  DownloadCatalog,
  RealzView,
  ReviewSection,
  SofaShowcaseSection,
  VideoSection,
} from "@/components/sections";
import { OtherCardsSection } from "@/components/sections/OtherCardsSection";
import { ColorSelector } from "@/components/ui";
import { fetchPayloadLocal } from "@/lib/payload";
import { toSlug } from "@/lib/toSlug";
import { notFound } from "next/navigation";

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

interface SofaPageProps {
  params: Promise<{ slug: string }>;
}

async function getSofaData(slug: string) {
  try {
    const payload = await fetchPayloadLocal();
    const result = await payload.find({
      collection: "sofas",
      where: {
        isActive: { equals: true },
      },
      overrideAccess: true,
      limit: 100,
    });

    const currentSofa = result.docs.find(
      (doc: any) => toSlug(doc.title) === slug,
    );
    const otherSofas = result.docs
      .filter((doc: any) => toSlug(doc.title) !== slug)
      .slice(0, 4)
      .map((sofa: any) => ({
        id: sofa.id,
        title: sofa.title,
        category: sofa.category,
        image: `/images/cards/${sofa.imageFilename}`,
        price: sofa.price,
        oldPrice: sofa.oldPrice,
      }));

    return { currentSofa: currentSofa || null, otherSofas };
  } catch (error) {
    console.error("Error fetching sofa data:", error);
    return { currentSofa: null, otherSofas: [] };
  }
}

export async function generateMetadata({ params }: SofaPageProps) {
  const { slug } = await params;
  const { currentSofa: sofa } = await getSofaData(slug);

  if (!sofa) {
    return { title: "Диван не найден" };
  }

  return {
    title: `${sofa.category || "Диван"} ${sofa.title}`,
    description: `${sofa.category || "Диван"} ${sofa.title} — от ${Number(sofa.price).toLocaleString("ru-RU")} ₽. Производство модульных диванов.`,
  };
}

export default async function SofaPage({ params }: SofaPageProps) {
  const { slug } = await params;
  const { currentSofa: sofa, otherSofas } = await getSofaData(slug);

  if (!sofa) {
    notFound();
  }

  return (
    <div className='w-full '>
      <div className='bg-[#F5F5F5] pt-[120px] md:pt-[160px] pb-12'>
        <div className='content  '>
          <ColorSelector />
          <RealzView
            images={[
              "/sofas/Easy/views/1.webp",
              "/sofas/Easy/views/2.webp",
              "/sofas/Easy/views/3.webp",
              "/sofas/Easy/views/4.webp",
              "/sofas/Easy/views/5.webp",
            ]}
          />
        </div>
      </div>

      <SofaShowcaseSection
        title='Угловой диван Easy'
        description='Он станет амбассадором комфорта в лофт стиле, для интерьера вашего дома. Впечатляющий эстетический вид и исключительный комфорт делают его центральным элементом в декоре вашего дома. Благодаря прочности и устойчивости каркаса, этот диван обеспечит комфорта на долгие годы использования.'
        image='/sofas/Easy/section-2.webp'
        mobileImage='/sofas/Easy/section-2-mob.webp'
      />
      <VideoSection
        title='Короткие видео'
        subtitle='В интерьере, на производстве, каркас и ткани'
        videos={MOCK_VIDEOS}
      />
      <ConfigSection />

      <CalculationSection />
      <DownloadCatalog />
      <OtherCardsSection
        title='Другие модели'
        subtitle='Возможно, вам понравится что-то еще'
        products={otherSofas}
      />
      <ReviewSection hasBackground={false} />
    </div>
  );
}
