import "@/assets/style/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const gilroy = localFont({
  src: [
    {
      path: "../public/fonts/Gilroy/Gilroy-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Gilroy/Gilroy-Black.woff2",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk' className='h-full' suppressHydrationWarning>
      <body
        className={`${gilroy.variable} font-sans antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
