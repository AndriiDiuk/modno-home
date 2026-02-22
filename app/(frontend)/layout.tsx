import "@/assets/style/globals.css";
import { Footer, Header } from "@/components/sections";
import { fetchPayload } from "@/lib/payload";
import type { Metadata } from "next";
import localFont from "next/font/local";

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy/Gilroy-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy/Gilroy-Black.woff2",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

async function getSettings() {
  try {
    const settings = await fetchPayload<any>("globals/settings");
    return settings || {};
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const seo = settings?.seo || {};

  return {
    title: {
      default: seo.title || "Modno Home",
      template: `%s | ${seo.title || "Modno Home"}`,
    },
    description: seo.description || "Modno Home - Luxury Interior Design",
    keywords: seo.keywords || "",
    icons: {
      icon: seo.favicon?.url || "/favicon.ico",
    },
    openGraph: {
      type: "website",
      images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : [],
    },
  };
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const seo = settings?.seo || {};

  return (
    <html lang='uk' className='h-full' suppressHydrationWarning>
      <head>
        {seo.scripts?.head && (
          <script dangerouslySetInnerHTML={{ __html: seo.scripts.head }} />
        )}
      </head>
      <body
        className={`${gilroy.variable} font-sans antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {seo.scripts?.body && (
          <div dangerouslySetInnerHTML={{ __html: seo.scripts.body }} />
        )}
        <Header data={settings.header || {}} />
        <main className='grow'>{children}</main>
        <Footer data={settings} />
      </body>
    </html>
  );
}
