"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader2, User, AtSign, Tag, MessageSquare, Briefcase, Handshake, Globe, GraduationCap, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";
import { CurvedInput, CurvedTextarea } from "@/components/reactbits/components/CurvedInput";
import { SpecularButton } from "@/components/reactbits/components/SpecularButton";
import { GlassMorphismCard, GlassSurface } from "@/components/reactbits/components/GlassSurface";
import { Silk } from "@/components/reactbits/backgrounds/Silk";

const whatsappNumber = "553981316379";

const contactInfo = [
  { icon: Mail, label: "Email", value: "adrianppety@gmail.com", href: "mailto:adrianppety@gmail.com" },
  { icon: MapPin, label: "Localização", value: "Pelotas, RS - Brasil", href: null },
  { icon: Phone, label: "WhatsApp", value: "(53) 98131-6379", href: `https://wa.me/${whatsappNumber}` },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Adrianppety" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/adrian-pety-6a48883b5/" },
  { icon: Twitter, label: "Twitter/X", href: "https://x.com/Adrianppety" },
];

const objectives = [
  { icon: GraduationCap, label: "Estágio", desc: "Aprender na prática com mentoria" },
  { icon: Briefcase, label: "Primeiro Emprego (CLT)", desc: "Crescer em equipe estruturada" },
  { icon: Laptop, label: "Freelance / Projetos", desc: "Experiência real e portfólio" },
  { icon: Handshake, label: "Networking", desc: "Conexões e troca de conhecimento" },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.subject.trim()) newErrors.subject = "Assunto é obrigatório";
    if (!formData.message.trim()) newErrors.message = "Mensagem é obrigatória";
    else if (formData.message.trim().length < 10) newErrors.message = "Mensagem muito curta (mín. 10 caracteres)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const whatsappText = encodeURIComponent(
        `Olá! Meu nome é ${formData.name}.\n\nAssunto: ${formData.subject}\n\n${formData.message}`
      );

      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, "_blank", "noopener,noreferrer");

      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao abrir o WhatsApp. Tente novamente ou entre em contato por email.");
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <section id="contato" className="section-padding bg-white dark:bg-dark-950 relative overflow-hidden">
      <Silk
        colors={["#4B5320", "#667344", "#87966A"]}
        speed={0.06}
        opacity={0.08}
        className="pointer-events-none"
      />

      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
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
            Entre em Contato
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-950 dark:text-white mb-6">
            Vamos <span className="text-gradient">conversar</span>?
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-300 leading-relaxed">
            Estou buscando estágio, primeiro emprego, oportunidades freelance e conexões na área de desenvolvimento.
            Mande uma mensagem — respondo rápido!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            <GlassMorphismCard
              title="Contato Direto"
              description="Prefere chamar no WhatsApp ou mandar email? Ambos funcionam!"
              interactive={false}
            >
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl transition-all duration-200 group",
                      item.href
                        ? "bg-white/50 dark:bg-dark-800/50 hover:bg-white dark:hover:bg-dark-700/50 border border-dark-200 dark:border-dark-700 hover:border-primary-500/50"
                        : "bg-white/50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700"
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark-500 dark:text-dark-500">{item.label}</p>
                      <p className="text-dark-900 dark:text-white font-medium group-hover:text-primary-500 transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </GlassMorphismCard>

            <GlassMorphismCard
              title="Redes & Código"
              description="Me acompanhe no GitHub e LinkedIn — posto aprendizados e projetos por lá."
              interactive={false}
            >
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl bg-white/50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700 flex items-center justify-center text-dark-600 dark:text-dark-400 hover:bg-white dark:hover:bg-dark-700 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 dark:hover:text-primary-400 transition-all duration-200 group hover:scale-110 hover:rotate-3"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </GlassMorphismCard>

            <GlassMorphismCard
              title="O que Busco"
              description="Estou aberto a diferentes formatos de trabalho."
              interactive={false}
            >
              <div className="space-y-3">
                {objectives.map((obj, index) => (
                  <div
                    key={obj.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700 group hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                      <obj.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-dark-900 dark:text-white">{obj.label}</p>
                      <p className="text-sm text-dark-500 dark:text-dark-400">{obj.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassMorphismCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <GlassSurface
              blur={24}
              opacity={0.12}
              borderOpacity={0.15}
              interactive={false}
              className="p-8"
            >
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-4 rounded-xl mb-8 -mx-8 -mt-8 mb-8">
                <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Mande uma Mensagem
                </h3>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h4 className="font-display text-xl font-bold text-dark-950 dark:text-white mb-2">
                    Mensagem Enviada!
                  </h4>
                  <p className="text-dark-600 dark:text-dark-400 mb-6">
                    Obrigado por entrar em contato, {formData.name || ""}! Responderemos o mais breve possível.
                  </p>
                  <SpecularButton variant="secondary" onClick={() => setStatus("idle")} size="lg">
                    Enviar outra mensagem
                  </SpecularButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <CurvedInput
                      label="Seu Nome"
                      name="name"
                      value={formData.name}
                      onChange={(value) => handleChange("name", value)}
                      error={errors.name}
                      placeholder="Seu nome completo"
                      required
                      autoComplete="name"
                      icon={<User className="w-5 h-5" />}
                      curveIntensity={0.12}
                    />
                    <CurvedInput
                      label="Seu Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(value) => handleChange("email", value)}
                      error={errors.email}
                      placeholder="seu@email.com"
                      required
                      autoComplete="email"
                      icon={<AtSign className="w-5 h-5" />}
                      curveIntensity={0.12}
                    />
                  </div>
                  <CurvedInput
                    label="Assunto"
                    name="subject"
                    value={formData.subject}
                    onChange={(value) => handleChange("subject", value)}
                    error={errors.subject}
                    placeholder="Estágio / Freelance / Dúvida / Outro"
                    required
                    icon={<Tag className="w-5 h-5" />}
                    curveIntensity={0.12}
                  />
                  <CurvedTextarea
                    label="Mensagem"
                    name="message"
                    value={formData.message}
                    onChange={(value) => handleChange("message", value)}
                    error={errors.message}
                    placeholder="Conte-me sobre a oportunidade, seu projeto ou apenas diga oi..."
                    rows={5}
                    required
                    icon={<MessageSquare className="w-5 h-5" />}
                    curveIntensity={0.12}
                  />
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
                    </motion.div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <SpecularButton
                      type="submit"
                      size="lg"
                      isLoading={status === "submitting"}
                      className="flex-1 sm:flex-none"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </SpecularButton>
                    <p className="text-xs text-dark-500 dark:text-dark-500 text-center self-center">
                      Ao enviar, você concorda com nossa{" "}
                      <a href="#" className="text-primary-500 hover:underline">Política de Privacidade</a>
                    </p>
                  </div>
                </form>
              )}
            </GlassSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}