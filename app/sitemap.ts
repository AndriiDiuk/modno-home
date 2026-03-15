import { fetchPayloadLocal, getBaseUrl } from "@/lib/payload";
import { toSlug } from "@/lib/toSlug";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const payload = await fetchPayloadLocal();
    const result = await payload.find({
      collection: "sofas",
      where: { isActive: { equals: true } },
      overrideAccess: true,
      limit: 100,
    });

    const sofaPages: MetadataRoute.Sitemap = result.docs.map((doc: any) => ({
      url: `${baseUrl}/sofa/${toSlug(doc.title)}`,
      lastModified: new Date(doc.updatedAt || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...sofaPages];
  } catch {
    return staticPages;
  }
}
