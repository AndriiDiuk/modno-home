import { PhoneIcon, TelegramSquareIcon, VkSquareIcon } from "@/assets/icons";
import { InfoSofa } from "@/components/sections";
import { ColorSelector, HeroTitle } from "@/components/ui";
import { fetchPayloadLocal, getCachedSettings } from "@/lib/payload";
import { toSlug } from "@/lib/toSlug";
import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";

const SofaShowcaseSection = dynamic(() =>
  import("@/components/sections/SofaShowcaseSection").then(
    (m) => m.SofaShowcaseSection,
  ),
);
const VideoSection = dynamic(() =>
  import("@/components/sections/VideoSection").then((m) => m.VideoSection),
);
const ConfigSection = dynamic(() =>
  import("@/components/sections/ConfigSection").then((m) => m.ConfigSection),
);
const CalculationSection = dynamic(() =>
  import("@/components/sections/CalculationSection").then(
    (m) => m.CalculationSection,
  ),
);
const DownloadCatalog = dynamic(() =>
  import("@/components/sections/DownloadCatalog").then(
    (m) => m.DownloadCatalog,
  ),
);
const OtherCardsSection = dynamic(() =>
  import("@/components/sections/OtherCardsSection").then(
    (m) => m.OtherCardsSection,
  ),
);
const ReviewSection = dynamic(() =>
  import("@/components/sections/ReviewSection").then((m) => m.ReviewSection),
);
const RealzView = dynamic(() =>
  import("@/components/sections/RealzView").then((m) => m.RealzView),
);

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
  const [{ currentSofa: sofa, otherSofas }, settingsData] = await Promise.all([
    getSofaData(slug),
    getCachedSettings(),
  ]);
  const socials = (settingsData as any)?.header?.socials || {};
  const phone = (settingsData as any)?.header?.phone || "";
  const phoneClean = phone.replace(/[\s\-\(\)]/g, "");

  if (!sofa) {
    notFound();
  }

  return (
    <div className='w-full '>
      <div className='bg-[#E9E9E7]  pt-7.5 md:pt-40 pb-12 relative overflow-hidden'>
        <Image
          src='/sofas/Easy/bg-hero.webp'
          alt={sofa.title}
          fill
          className='hidden lg:block object-cover object-top z-0 w-full'
          priority
        />
        <Image
          src='/sofas/Easy/bg-hero-mob.webp'
          alt={sofa.title}
          fill
          className='lg:hidden object-contain  object-top z-0'
          priority
        />
        <div className='content pt-15'>
          <div className='flex flex-col lg:flex-row justify-between  mb-10 md:mb-30'>
            <div className='flex md:hidden flex-col items-center gap-4 z-2 mb-6'>
              <a
                href={`tel:${phoneClean}`}
                className='text-2xl font-semibold leading-[1.2]'
              >
                {phone}
              </a>
              <div className='flex items-center gap-3'>
                {socials.vk && (
                  <a
                    href={socials.vk}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <VkSquareIcon className='w-10 h-10' />
                  </a>
                )}
                {socials.telegram && (
                  <a
                    href={socials.telegram}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <TelegramSquareIcon className='w-10 h-10' />
                  </a>
                )}
                <a href={`tel:${phoneClean}`}>
                  <PhoneIcon className='w-10 h-10' />
                </a>
              </div>
            </div>
            <div className=' flex flex-col justify-between w-full relative z-2  '>
              <HeroTitle
                topLine='Диван Easy'
                bottomLine='амбассадор комфорта в лофт стиле'
                bottomBold={["амбассадор "]}
                description='Доступен к заказу в любом размере и конфигурации, подберем цвет, ткань и мягкость именно для Вас'
                topBold={["Easy"]}
                descriptionBold={["Доступен к заказу", "именно для Вас"]}
                className='mb-48'
              />
              <div className='flex justify-center w-full relative z-2 mb-5 lg:mb-0 '>
                <ColorSelector />
              </div>
            </div>
            <div className='relative z-2'>
              <InfoSofa
                socials={socials}
                equipment='Оттоманка со спинкой и подлокотником, широкая сидушка со спинкой и подлокотником, 4 подушки.'
                sizes={[
                  { label: "Ширина дивана", value: "от 2000...3200 мм." },
                  { label: "Глубина посадки", value: "от 600...850 мм." },
                  { label: "Оттоманки", value: "от 1250...1750 мм." },
                ]}
                materials={[
                  { label: "Каркас", value: "березовая фанера класса E1." },
                  {
                    label: "Ткань",
                    value: "велюр, микровелюр, шенилл, рогожка, букле.",
                  },
                  {
                    label: "Наполнитель",
                    value: "200 мм. ППУ + премиум Elax.",
                  },
                ]}
                price={102900}
                oldPrice={144900}
                className='shrink-0 mx-auto lg:mx-0'
              />
            </div>
          </div>

          <div className='relative flex flex-col lg:flex-row gap-6 items-start z-2'>
            <div className='flex-1 w-full'>
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

      <CalculationSection socials={socials} />

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
