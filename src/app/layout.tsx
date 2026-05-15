import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getRequiredSiteUrl, siteConfig } from "@/lib/config/site";
import "@/styles/globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap"
});

const siteUrl = getRequiredSiteUrl();

export const metadata: Metadata = {
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: siteUrl,
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website"
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={siteConfig.language} className={roboto.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要內容
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
