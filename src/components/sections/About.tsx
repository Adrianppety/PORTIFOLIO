"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Heart, Users, Award, Zap, Briefcase, Laptop } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { SplitText, RevealText } from "@/components/reactbits/text-animations/SplitText";
import { GradientWaves } from "@/components/reactbits/backgrounds/GradientWaves";

const skills = [
  {
    category: "Frontend",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "React Hooks", "Context API"],
    icon: Code2,
    color: "from-primary-500 to-accent-500",
  },
  {
    category: "Backend",
    items: ["Node.js / Express", "Python / FastAPI", "PostgreSQL / MySQL", "MongoDB", "REST APIs"],
    icon: Brain,
    color: "from-accent-600 to-dark-500",
  },
  {
    category: "Ferramentas & DevOps",
    items: ["Git / GitHub", "Docker", "Vercel", "VS Code", "Insomnia/Postman"],
    icon: Zap,
    color: "from-primary-700 to-primary-500",
  },
  {
    category: "Em Aprendizado",
    items: ["Docker Avançado", "Kubernetes", "AWS", "Testes Automatizados", "CI/CD"],
    icon: Award,
    color: "from-accent-400 to-primary-600",
  },
];

const experience = [
  {
    role: "Estudante de Análise e Desenvolvimento de Sistemas",
    company: "Faculdade de Tecnologia",
    period: "2025 - 2028",
    description: "Graduação em Análise e Desenvolvimento de Sistemas. Formação técnica completa: lógica de programação, POO, bancos de dados, engenharia de software, metodologias ágeis, desenvolvimento web full stack, arquitetura de software e computação em nuvem. Início em 2025, conclusão prevista para 2028. Atualmente no 3º semestre.",
    highlights: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "POO", "Metodologias Ágeis"],
  },
  {
    role: "Transição de Carreira & Busca por Oportunidades",
    company: "Inserção no Mercado Tech",
    period: "2026 - Presente",
    description: "Ano dedicado à transição efetiva para a área de tecnologia: construção de portfólio sólido, participação em processos seletivos, networking ativo em comunidades tech, contribuições open source e desenvolvimento de projetos reais para demonstrar competência técnica. Foco em estágio, primeiro emprego (CLT) ou freelance.",
    highlights: ["Portfólio", "Networking", "Open Source", "Entrevistas Técnicas", "Projetos Reais"],
  },
];

export function About() {
  return (
    <section id="sobre" className="section-padding bg-white dark:bg-dark-950 relative overflow-hidden">
      <GradientWaves
        colors={["#4B5320", "#87966A", "#667344"]}
        speed={0.08}
        opacity={0.15}
        className="pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <RevealText
            split="words"
            delay={200}
            duration={600}
            stagger={30}
            className="inline-block px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          >
            Sobre Mim
          </RevealText>
          <SplitText
            split="words"
            delay={300}
            duration={800}
            stagger={40}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 dark:text-white mb-6"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          >
            <span>Transformando ideias em </span>
            <span className="text-gradient">código </span>
          </SplitText>
          <RevealText
            delay={600}
            duration={800}
            className="text-lg text-dark-600 dark:text-dark-300 leading-relaxed"
            from={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          >
            Sou Adrian Pety, estudante do 3º semestre de Análise e Desenvolvimento de Sistemas,
            apaixonado por tecnologia e resolução de problemas. Busco minha primeira oportunidade profissional
            (estágio, CLT ou freelance) para aplicar meus conhecimentos em desenvolvimento full stack
            e crescer junto a uma equipe experiente. Tenho sede de aprender, proatividade e comprometimento
            em entregar código limpo, performático e bem testado.
          </RevealText>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <SplitText
              split="words"
              delay={0}
              duration={600}
              stagger={30}
              className="font-display text-2xl sm:text-3xl font-bold text-dark-950 dark:text-white"
              from={{ opacity: 0, x: -30 }}
              to={{ opacity: 1, x: 0 }}
            >
              Formação & Jornada
            </SplitText>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-6 border-l-2 border-primary-200 dark:border-primary-800"
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 -translate-x-1/2" />
                  <div className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                    <span>{exp.period}</span>
                  </div>
                  <RevealText
                    delay={index * 100}
                    duration={500}
                    className="font-semibold text-dark-950 dark:text-white"
                    from={{ opacity: 0, x: -20 }}
                    to={{ opacity: 1, x: 0 }}
                  >
                    {exp.role}
                  </RevealText>
                  <RevealText
                    delay={index * 100 + 100}
                    duration={500}
                    className="text-dark-600 dark:text-dark-400"
                    from={{ opacity: 0, x: -20 }}
                    to={{ opacity: 1, x: 0 }}
                  >
                    {exp.company}
                  </RevealText>
                  <RevealText
                    delay={index * 100 + 200}
                    duration={500}
                    className="text-dark-600 dark:text-dark-400 text-sm mt-2"
                    from={{ opacity: 0, x: -20 }}
                    to={{ opacity: 1, x: 0 }}
                  >
                    {exp.description}
                  </RevealText>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.highlights.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SplitText
              split="words"
              delay={0}
              duration={600}
              stagger={30}
              className="font-display text-2xl sm:text-3xl font-bold text-dark-950 dark:text-white mb-6"
              from={{ opacity: 0, x: 30 }}
              to={{ opacity: 1, x: 0 }}
            >
              Stack Tecnológica
            </SplitText>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br", skill.color)}>
                      <skill.icon className="w-5 h-5 text-white" />
                    </div>
                    <RevealText
                      split="words"
                      delay={index * 100}
                      duration={500}
                      stagger={20}
                      className="font-semibold text-dark-950 dark:text-white"
                      from={{ opacity: 0, y: 10 }}
                      to={{ opacity: 1, y: 0 }}
                    >
                      {skill.category}
                    </RevealText>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-12">
                    {skill.items.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.03 }}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 text-sm font-medium text-dark-700 dark:text-dark-300 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SplitText
            split="words"
            delay={0}
            duration={600}
            stagger={30}
            className="font-display text-2xl sm:text-3xl font-bold text-dark-950 dark:text-white text-center mb-10"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          >
            O que me Move
          </SplitText>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code2, title: "Código Limpo", desc: "Escrevo código legível, testável e manutenível seguindo boas práticas e padrões." },
              { icon: Brain, title: "Aprendizado Contínuo", desc: "Sempre explorando novas tecnologias e aprimorando habilidades técnicas." },
              { icon: Heart, title: "Proatividade", desc: "Tomo iniciativa, busco soluções e não espero alguém me dizer o que fazer." },
              { icon: Users, title: "Colaboração", desc: "Acredito no poder do trabalho em equipe e comunicação transparente." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" hover className="h-full p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <RevealText
                    delay={index * 100}
                    duration={500}
                    className="font-semibold text-dark-950 dark:text-white mb-2"
                    from={{ opacity: 0, y: 10 }}
                    to={{ opacity: 1, y: 0 }}
                  >
                    {value.title}
                  </RevealText>
                  <RevealText
                    delay={index * 100 + 100}
                    duration={500}
                    className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed"
                    from={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  >
                    {value.desc}
                  </RevealText>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <SplitText
            split="words"
            delay={0}
            duration={600}
            stagger={30}
            className="font-display text-2xl sm:text-3xl font-bold text-dark-950 dark:text-white text-center mb-8"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          >
            Objetivos Profissionais
          </SplitText>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code2, title: "Estágio", desc: "Oportunidade para aprender na prática com mentoria de devs experientes." },
              { icon: Briefcase, title: "Primeiro Emprego (CLT)", desc: "Posição júnior para crescer profissionalmente em equipe estruturada." },
              { icon: Laptop, title: "Freelance / Projetos", desc: "Trabalhos pontuais para ganhar experiência real e construir portfólio." },
              { icon: Users, title: "Networking", desc: "Conectar com devs, participar de comunidades e trocar conhecimentos." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" hover className="h-full p-6 text-center border-2 border-primary-200 dark:border-primary-800">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <RevealText
                    delay={index * 100}
                    duration={500}
                    className="font-semibold text-dark-950 dark:text-white mb-2"
                    from={{ opacity: 0, y: 10 }}
                    to={{ opacity: 1, y: 0 }}
                  >
                    {value.title}
                  </RevealText>
                  <RevealText
                    delay={index * 100 + 100}
                    duration={500}
                    className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed"
                    from={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  >
                    {value.desc}
                  </RevealText>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}