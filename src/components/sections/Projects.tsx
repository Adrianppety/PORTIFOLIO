"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Code2, FolderOpen, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function Projects() {
  return (
    <section id="projetos" className="section-padding bg-dark-50 dark:bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            Projetos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 dark:text-white mb-6">
            Construindo <span className="text-gradient">experiência real</span>
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-300 leading-relaxed max-w-2xl mx-auto">
            Atualmente, estou no 3º semestre de ADS e desenvolvo projetos práticos para consolidar meus conhecimentos.
            Esta seção será atualizada à medida que eu concluir projetos para o portfólio, trabalhos freelance e contribuições para projetos de código aberto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <Card variant="glass" hover className="p-8 text-center h-full border-2 border-dashed border-primary-300 dark:border-primary-700">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-dark-950 dark:text-white mb-2">
              Projetos acadêmicos
            </h3>
            <p className="text-dark-600 dark:text-dark-400 mb-4">
              Trabalhos da faculdade que demonstram conhecimentos em algoritmos, programação orientada a objetos (POO), bancos de dados e engenharia de software.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
              <Code2 className="w-4 h-4" /> Em andamento
            </span>
          </Card>

          <Card variant="glass" hover className="p-8 text-center h-full border-2 border-dashed border-primary-300 dark:border-primary-700">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-dark-950 dark:text-white mb-2">
              Projetos pessoais
            </h3>
            <p className="text-dark-600 dark:text-dark-400 mb-4">
              Aplicações full stack desenvolvidas para praticar tecnologias modernas, como Next.js, React, Node.js, TypeScript e Docker.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
              <Plus className="w-4 h-4" /> Em desenvolvimento
            </span>
          </Card>

          <Card variant="glass" hover className="p-8 text-center h-full border-2 border-dashed border-primary-300 dark:border-primary-700">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
              <Github className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-dark-950 dark:text-white mb-2">
              Código aberto e colaborações
            </h3>
            <p className="text-dark-600 dark:text-dark-400 mb-4">
              Futuras contribuições para projetos de código aberto, documentação e ferramentas para a comunidade de desenvolvimento.
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
              <Github className="w-4 h-4" /> Planejado
            </span>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button variant="secondary" size="lg" className="group" onClick={() => window.open('https://github.com/Adrianppety', '_blank')}>
            Acessar meu GitHub
            <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}