import { createFileRoute } from "@tanstack/react-router";
import { Award, Brain, GraduationCap, HeartHandshake, Instagram, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import BlurText from "@/components/animations/BlurText";
import { Card } from "@/components/ui/card";
import heroAsset from "@/assets/header-hero.png.asset.json";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre | Dr. Weslley Demorais" },
      {
        name: "description",
        content:
          "Doutor em neurociências e genética e PhD em Psiquiatria e Saúde Mental com formação na UCLA e na Universidade de Paris. Conheça a trajetória do Dr. Weslley Demorais.",
      },
      { property: "og:title", content: "Sobre | Dr. Weslley Demorais" },
      {
        property: "og:description",
        content: "Trajetória, formação e atuação do Dr. Weslley Demorais.",
      },
    ],
  }),
  component: Sobre,
});

const blocks = [
  {
    icon: Brain,
    title: "Atuação Terapêutica",
    text: "Sou Especialista em transtornos e distúrbios. Passei anos estudando, atendendo e melhorando a vida de crianças e adultos autistas, com TDAH e outros transtornos e distúrbios.",
  },
  {
    icon: GraduationCap,
    title: "Professor",
    text: "Não bastou para mim apenas atender. Fui atrás das MELHORES técnicas de atendimento, dos melhores estudos científicos e dos protocolos PADRÃO-OURO e ensino isto para cada um dos meus alunos nos meus cursos e nas universidades que ensino.",
  },
  {
    icon: HeartHandshake,
    title: "Orientador de mães e pais",
    text: "Dedico muito do meu dia a dia a atender famílias que precisam de mim. Ensino como vencer distúrbios do sono, seletividade alimentar e vários outros sintomas dos transtornos.",
  },
  {
    icon: Users,
    title: "Empresário",
    text: "Faço a gestão ativamente de uma holding com 8 empresas no mercado de educação e saúde.",
  },
];

function Sobre() {
  return (
    <SiteLayout>
      {/* intro */}
      <section className="border-b border-border/60 bg-navy-deep py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Sobre mim
            </p>
            <BlurText
              text="Doutor em neurociências e genética e PhD em Psiquiatria e Saúde Mental."
              animateBy="words"
              delay={100}
              className="font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl md:text-4xl"
            />
            <p className="mt-6 text-lg text-muted-foreground text-pretty">
              Formação na Universidade da Califórnia em Los Angeles — UCLA e na
              Universidade de Paris. Dedico minha carreira a estudar, atender e ensinar
              sobre saúde mental, transtornos e distúrbios com base nos protocolos
              padrão-ouro.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-gold/40 bg-card p-4">
              <Award className="h-6 w-6 shrink-0 text-gold" />
              <p className="text-sm text-cream/90">
                Formação internacional e atuação clínica, acadêmica e empresarial.
              </p>
            </div>
            <a
              href="https://www.instagram.com/weslley_demorais/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold/80"
            >
              <Instagram className="h-4 w-4" />
              Siga no Instagram
            </a>
          </div>
          <Reveal className="overflow-hidden rounded-2xl border border-border/60 shadow-elegant">
            <img src={heroAsset.url} alt="Dr. Weslley Demorais" className="w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* blocks */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <Card className="h-full border-border/60 bg-card p-8">
                  <b.icon className="h-8 w-8 text-gold" />
                  <h2 className="mt-4 text-2xl font-semibold">{b.title}</h2>
                  <p className="mt-3 text-muted-foreground">{b.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* quote + stats */}
      <section className="border-t border-border/60 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="font-display text-3xl font-medium leading-snug sm:text-4xl text-gray-900">
              "Em minha vida luto pela excelência e para honrar a Deus, que não se deixou
              vencer em generosidade."
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              { to: 1300, label: "pacientes atendidos" },
              { to: 1000, label: "profissionais formados por mim" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="font-display text-5xl font-semibold text-gold">
                  +<CountUp to={s.to} separator="." duration={2.4} />
                </div>
                <p className="mt-2 text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}