import "@/assets/style/globals.css";
import { Footer, Header } from "@/components/sections";
import { getCachedSettings } from "@/lib/payload";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

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
    const settings = await getCachedSettings();
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
  const scripts = seo.scripts || {};

  return (
    <html lang='uk' className='h-full' suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        {scripts.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${scripts.googleAnalyticsId}`}
              strategy='afterInteractive'
            />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${scripts.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}

        {/* Yandex Metrika */}
        {scripts.yandexMetrikaId && (
          <Script id='yandex-metrika' strategy='afterInteractive'>
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${scripts.yandexMetrikaId}, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });
            `}
          </Script>
        )}

        {/* Custom Head Script */}
        {scripts.head && (
          <script dangerouslySetInnerHTML={{ __html: scripts.head }} />
        )}
      </head>
      <body
        className={`${gilroy.variable} font-sans antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {/* Custom Body Script (e.g. GTM noscript) */}
        {scripts.body && (
          <div dangerouslySetInnerHTML={{ __html: scripts.body }} />
        )}

        {/* Yandex Metrika Noscript */}
        {scripts.yandexMetrikaId && (
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${scripts.yandexMetrikaId}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=''
              />
            </div>
          </noscript>
        )}

        <Header data={settings.header || {}} />
        <main className='grow'>{children}</main>
        <Footer data={settings} />
      </body>
    </html>
  );
}
