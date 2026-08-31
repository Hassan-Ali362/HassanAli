import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme";
import { Ambient } from "@/components/ui/ambient";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { profile } from "@/lib/data";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title = `${profile.name}, ${profile.role}`;
const description =
  "I build full-stack products and the AI inside them. React, Vue, Next.js and Node on the surface, Postgres and queued jobs behind it, retrieval and agents where they earn their place.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.socials.website),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  keywords: [
    "AI Engineer",
    "Full-Stack Engineer",
    "React",
    "Vue",
    "Next.js",
    "Node.js",
    "LangChain",
    "RAG",
    "Postgres",
    "Islamabad",
  ],
  authors: [{ name: profile.name, url: profile.socials.website }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title,
    description,
    url: profile.socials.website,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  /* Tracks --bg in globals.css. */
  themeColor: "#111318",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.socials.website,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  sameAs: [profile.socials.linkedin, profile.socials.github],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* Theme is locked dark. This design reads as instrumentation; a light
       variant would be a different site, not a variant of this one. */
    <html lang="en" className={`${archivo.variable} ${plexMono.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-bg text-fg" suppressHydrationWarning>
        <ThemeProvider>
        <SmoothScroll />
        <Ambient />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-sq focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Nav />
        <main>{children}</main>
        <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
