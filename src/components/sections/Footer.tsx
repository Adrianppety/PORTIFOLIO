"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
const socialLinks = [
  { href: "https://github.com/Adrianppety", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/adrian-pety-6a48883b5/", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/Adrianppety", label: "Twitter/X", icon: Twitter },
  { href: "mailto:adrianppety@gmail.com", label: "Email", icon: Mail },
];

const footerLinks = {
  Projetos: [
    { label: "GitHub", href: "https://github.com/Adrianppety" },
    { label: "Projetos Pessoais", href: "#projetos" },
    { label: "Open Source", href: "https://github.com/Adrianppety?tab=repositories" },
  ],
  Recursos: [
    { label: "Artigos & Estudos", href: "#" },
    { label: "Snippets Úteis", href: "#" },
    { label: "Ferramentas Dev", href: "#" },
  ],
  Carreira: [
    { label: "Sobre Mim", href: "#sobre" },
    { label: "Objetivos", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark-50 dark:bg-dark-950 border-t border-dark-200 dark:border-dark-800">
      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Link href="#" className="flex items-center gap-2 mb-6" aria-label="Ir para o início">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-dark-200/80 bg-dark-900 shadow-sm dark:border-dark-700">
                <img src="/icon.svg" alt="Logo do portfólio" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-xl font-bold text-dark-900 dark:text-white">
                Adrian Pety
              </span>
            </Link>
            <p className="text-dark-600 dark:text-dark-400 text-base leading-relaxed mb-6 max-w-xs">
              Estudante de ADS (3º semestre) • Desenvolvedor Full Stack Jr.
              Buscando estágio, primeiro emprego, freelance e conexões.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Projetos</h3>
            <ul className="space-y-3">
              {footerLinks.Projetos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Recursos</h3>
            <ul className="space-y-3">
              {footerLinks.Recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Carreira</h3>
            <ul className="space-y-3">
              {footerLinks.Carreira.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-dark-600 dark:text-dark-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-dark-200 dark:border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 dark:text-dark-500 text-sm">
              © {new Date().getFullYear()} Adrian Pety. Feito com
              <span className="flex items-center gap-1 ml-1">
                <Heart className="w-4 h-4 text-red-500" aria-hidden="true" />
                Next.js, TypeScript & ReactBits
              </span>
            </p>
            <div className="flex items-center gap-6 text-sm text-dark-500 dark:text-dark-500">
              <Link href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}