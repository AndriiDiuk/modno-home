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

export const metadata: Metadata = {
  title: {
    default: "Modno Home",
    template: "%s | Modno Home",
  },
  description: "Modno Home - Luxury Interior Design",
  openGraph: {
    type: "website",
  },
};

async function getSettings() {
  try {
    const settings = await fetchPayload<any>("globals/settings");
    return settings || {};
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang='uk' className='h-full' suppressHydrationWarning>
      <body
        className={`${gilroy.variable} font-sans antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Header data={settings.header || {}} />
        <main className='grow'>{children}</main>
        <Footer data={settings} />
      </body>
    </html>
  );
}
