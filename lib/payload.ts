import configPromise from "@payload-config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

export async function fetchPayloadLocal() {
  return await getPayload({ config: configPromise });
}

export const getCachedGlobal = (slug: any, revalidate = 60) =>
  unstable_cache(
    async () => {
      try {
        const payload = await fetchPayloadLocal();
        return await payload.findGlobal({
          slug,
          overrideAccess: true,
        });
      } catch (localError) {
        console.warn(
          `Local API failed for global "${slug}", falling back to HTTP:`,
          localError,
        );
        try {
          return await fetchPayload<any>(`globals/${slug}`);
        } catch (httpError) {
          console.error(
            `HTTP fallback also failed for global "${slug}":`,
            httpError,
          );
          return null;
        }
      }
    },
    [slug],
    { revalidate, tags: [`global_${slug}`] },
  );

export async function getCachedSettings() {
  return getCachedGlobal("settings")();
}

function getApiUrl(): string {
  if (process.env.NEXT_PUBLIC_PAYLOAD_URL) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    return url.endsWith("/api") ? url : `${url}/api`;
  }
  if (typeof window === "undefined") {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      "http://localhost:3000";
    return `${baseUrl}/api`;
  }
  return "/api";
}

export async function getPayloadClient() {
  return getApiUrl();
}

export async function fetchPayload<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${getApiUrl()}/${cleanEndpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    if (response.status === 404) return null as T;
    const errorText = await response.text();
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  return (await response.json()) as T;
}

export function getBaseUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000"
  );
}

export function getMediaUrl(media: unknown): string {
  if (!media) return "";
  if (typeof media === "string") {
    if (media.startsWith("http")) return media;
    const baseUrl = getBaseUrl();
    return media.startsWith("/") ? `${baseUrl}${media}` : `${baseUrl}/${media}`;
  }
  if (typeof media === "object" && media !== null) {
    const obj = media as Record<string, unknown>;
    if (typeof obj.url === "string") {
      const url = obj.url;
      if (url.startsWith("http")) return url;
      const baseUrl = getBaseUrl();
      return url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
    if (typeof obj.filename === "string") {
      return `${getBaseUrl()}/api/media/file/${obj.filename}`;
    }
  }
  return "";
}
