import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Adrian Pety",
    template: "%s | Adrian Pety",
  },
  description: "Desenvolvedor Full Stack Jr. - Estudante de ADS (3º semestre) buscando estágio, primeiro emprego, freelance e networking. Stack: React/Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB.",
  keywords: ["Adrian Pety", "Desenvolvedor Full Stack", "Next.js", "React", "TypeScript", "Node.js", "Portfolio", "Desenvolvedor Jr", "Estágio"],
  authors: [{ name: "Adrian Pety" }],
  creator: "Adrian Pety",
  publisher: "Adrian Pety",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://adrianpety.dev",
    title: "Adrian Pety | Desenvolvedor Full Stack Jr.",
    description: "Estudante de ADS (3º semestre) | Desenvolvedor Full Stack Jr. | Buscando estágio, CLT, freelance e networking",
    siteName: "Adrian Pety Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrian Pety | Desenvolvedor Full Stack Jr.",
    description: "Estudante de ADS (3º semestre) | Desenvolvedor Full Stack Jr. | Buscando estágio, CLT, freelance e networking",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F5EF" },
    { media: "(prefers-color-scheme: dark)", color: "#080A07" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary-500 text-white rounded-lg"
          >
            Pular para o conteúdo principal
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}