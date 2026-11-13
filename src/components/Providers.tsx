"use client";

import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}