"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-dark-950/90 backdrop-blur-lg shadow-sm border-b border-dark-200/50 dark:border-dark-800/50"
          : "bg-[#f3f3f1]/90 backdrop-blur-sm border-b border-dark-200/30 dark:border-dark-800/50 dark:bg-dark-950/80"
      )}
    >
      <nav className="container-custom" aria-label="Navegação principal">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="#" className="flex items-center gap-2" aria-label="Ir para o início">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-dark-200/80 bg-dark-900 shadow-sm dark:border-dark-700">
              <img src="/icon.svg" alt="Logo do portfólio" className="h-full w-full object-cover" />
            </div>
            <span className="font-display text-xl font-bold text-dark-900 dark:text-white hidden sm:block">
              Adrian Pety
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary-500 after:to-accent-500 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/adrianppety"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-dark-200 bg-white/80 text-dark-700 shadow-sm transition hover:border-primary-500 hover:text-primary-600 dark:border-dark-700 dark:bg-dark-900/70 dark:text-dark-200"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Alternar para modo escuro" : "Alternar para modo claro"}
              className="lg:hidden"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Alternar para modo escuro" : "Alternar para modo claro"}
              className="hidden lg:inline-flex"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <Button variant="primary" size="sm" className="hidden lg:inline-flex">
              Vamos conversar
            </Button>

            <button
              className="lg:hidden p-2 rounded-xl text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-dark-200 dark:border-dark-800 animate-slide-up">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-dark-200 dark:border-dark-800">
                <Button variant="secondary" className="flex-1" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <>
                      <Sun className="w-4 h-4" /> Modo Claro
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" /> Modo Escuro
                    </>
                  )}
                </Button>
                <Button variant="primary" className="flex-1">
                  Vamos conversar
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}