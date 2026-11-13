"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ParticleText } from "@/components/reactbits/text-animations/ParticleText";
import { Aurora } from "@/components/reactbits/backgrounds/Aurora";
import { TechText } from "@/components/reactbits/text-animations/TechText";

const techStack = [
  { name: "Next.js", icon: "△" },
  { name: "React", icon: "⚛" },
  { name: "TypeScript", icon: "{}", color: "text-accent-400" },
  { name: "Tailwind CSS", icon: "◈", color: "text-primary-400" },
  { name: "Node.js", icon: "◆", color: "text-primary-500" },
  { name: "PostgreSQL", icon: "■", color: "text-accent-500" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-dark-950 dark:via-dark-950 dark:to-dark-900" />

      <Aurora
        colors={["#4B5320", "#667344", "#87966A", "#252D1B"]}
        speed={0.12}
        intensity={0.8}
        blur={100}
        opacity={0.5}
      />

      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 36v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" aria-hidden="true" />

      <motion.div
        className="container-custom relative z-10"
        initial={false}
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
          },
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary-500"
              />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Buscando estágio · primeiro emprego · freelance
              </span>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="space-y-6"
            >
              <ParticleText
                text="Adrian Pety"
                fontSize="clamp(2.75rem, 7vw, 5.75rem)"
                fontWeight="800"
                particleCount={200}
                particleSize={2.5}
                colors={["#2F3D28", "#4B5D36", "#7B8F64"]}
                speed={0.06}
                ease={0.1}
                className="w-full min-h-[180px]"
              />

              <motion.p
            
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } },
                }}
                className="text-lg sm:text-xl text-dark-600 dark:text-dark-300 leading-relaxed max-w-xl"
              >
                Estudante de Análise e Desenvolvimento de Sistemas (3º semestre) apaixonado por construir
                aplicações web modernas, escaláveis e acessíveis. Busco oportunidades para crescer profissionalmente
                e transformar ideias complexas em experiências digitais elegantes.
              </motion.p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.5 } },
              }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button size="lg" className="group" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>Entrar em Contato</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => window.open('https://github.com/Adrianppety', '_blank')}>
                <Code2 className="w-5 h-5" />
                GitHub
              </Button>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.6 } },
              }}
              className="flex flex-wrap items-center gap-3"
            >
              <TechText
                text="Desenvolvedor Full Stack Jr."
                fontSize="clamp(1.25rem, 3vw, 2.5rem)"
                fontWeight="600"
                color="#B5BD9D"
                dashColor="#87966A"
                dashLength={10}
                gapLength={6}
                animationSpeed={0.4}
                interactRadius={120}
                className="min-h-[70px] w-auto"
              />
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: index * 0.05 } },
                  }}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-dark-200 dark:border-dark-700",
                    tech.color
                  )}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="font-medium text-dark-700 dark:text-dark-300">{tech.name}</span>
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
            }}
            className="relative"
          >
            <div className="relative perspective-1000">
              <div className="relative preserve-3d animate-float">
                <div className="mx-auto w-full max-w-[450px] overflow-hidden rounded-[2rem] border border-primary-200/70 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-800 p-1 shadow-[0_30px_80px_rgba(102,115,68,0.2)] dark:border-primary-800/60">
                  <div className="aspect-[3/4] overflow-hidden rounded-[1.75rem]">
                    <img
                      src="/a7901457-1f81-4978-be45-9f68d1d5198f.jpeg"
                      alt="Foto de Adrian Pety"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
      >
        <div className="w-6 h-10 border-2 border-dark-300 dark:border-dark-600 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary-500"
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}