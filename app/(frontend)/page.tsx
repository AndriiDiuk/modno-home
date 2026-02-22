import { ProductSections } from "@/components/sections";
import { getCachedHome } from "@/lib/payload";

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
      <ProductSections title={title} subtitle={subtitle} products={products} />
    </div>
  );
}
