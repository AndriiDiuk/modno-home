import { CalculationSection, ReviewSection } from "@/components/sections";
import { OtherCardsSection } from "@/components/sections/OtherCardsSection";
import { fetchPayloadLocal } from "@/lib/payload";
import { toSlug } from "@/lib/toSlug";
import Image from "next/image";
import { notFound } from "next/navigation";

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

  const formatPrice = (p: number) => p.toLocaleString("ru-RU") + " ₽";

  return (
    <div className='w-full py-10 md:py-16'>
      <div className='content'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-14'>
          {/* Image */}
          <div className='w-full lg:w-1/2'>
            <div className='relative aspect-[4/3] w-full rounded-[12px] overflow-hidden bg-brand-light-gray'>
              <Image
                src={`/images/cards/${sofa.imageFilename}`}
                alt={`${sofa.category || "Диван"} ${sofa.title}`}
                fill
                className='object-cover'
                priority
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </div>
          </div>

          {/* Info */}
          <div className='w-full lg:w-1/2 flex flex-col justify-center'>
            <span className='text-brand-muted text-[14px] md:text-[16px] mb-1'>
              {sofa.category || "Диван"}
            </span>
            <h1 className='text-[36px] md:text-[52px] font-bold text-brand-black leading-[1.1] mb-6'>
              {sofa.title}
            </h1>

            {/* Price */}
            <div className='flex items-end gap-4 mb-8'>
              <div className='flex flex-col'>
                {sofa.oldPrice && (
                  <span className='text-[16px] text-brand-muted line-through'>
                    {formatPrice(sofa.oldPrice)}
                  </span>
                )}
                <span className='text-[28px] md:text-[36px] font-bold text-brand-black'>
                  <span className='text-[20px] font-medium mr-1'>от</span>
                  {formatPrice(sofa.price)}
                </span>
              </div>
            </div>

            {/* Description placeholder */}
            <p className='text-brand-gray text-[16px] md:text-[18px] leading-[1.6] mb-8'>
              Модульный диван {sofa.title} — стильное и функциональное решение
              для вашего интерьера. Высококачественные материалы и продуманная
              конструкция обеспечивают максимальный комфорт.
            </p>

            {/* CTA */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <button className='h-14 px-10 bg-brand-black text-white rounded-[8px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer text-[15px]'>
                Заказать
              </button>
              <button className='h-14 px-10 border border-brand-black text-brand-black rounded-[8px] font-bold uppercase tracking-wider hover:bg-brand-black hover:text-white transition-all cursor-pointer text-[15px]'>
                Задать вопрос
              </button>
            </div>
          </div>
        </div>
      </div>
      <OtherCardsSection
        title='Другие модели'
        subtitle='Возможно, вам понравится что-то еще'
        products={otherSofas}
      />
      <CalculationSection />
      <ReviewSection hasBackground={false} />
    </div>
  );
}
