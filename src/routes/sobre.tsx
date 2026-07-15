import { createFileRoute } from "@tanstack/react-router";
import { Award, Brain, GraduationCap, HeartHandshake, Instagram, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/animations/Reveal";
import CountUp from "@/components/animations/CountUp";
import BlurText from "@/components/animations/BlurText";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre | Dr. Weslley Demorais" },
      {
        name: "description",
        content:
          "Doutor em neurociências e genética e PhD em Psiquiatria e Saúde Mental com formação na UCLA e na Universidade de Paris.",
      },
    ],
  }),
  component: Sobre,
});

const blocks = [
  {
    icon: Brain,
    title: "Atuação Terapêutica",
    text: "Sou especialista em transtornos e distúrbios, com experiência no atendimento de crianças e adultos com autismo, TDAH e outras condições.",
  },
  {
    icon: GraduationCap,
    title: "Professor",
    text: "Ensino técnicas baseadas em evidência científica e protocolos padrão-ouro para profissionais e alunos.",
  },
  {
    icon: HeartHandshake,
    title: "Orientação Familiar",
    text: "Auxilio famílias a lidar com desafios como sono, alimentação e comportamento relacionados aos transtornos.",
  },
  {
    icon: Users,
    title: "Empresário",
    text: "Gestão de uma holding com atuação nas áreas de educação e saúde.",
  },
];

function Sobre() {
  return (
    <SiteLayout>
      
      {/* INTRO */}
      <section className="border-b border-border/60 bg-navy-deep py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          
          {/* TEXTO */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Sobre mim
            </p>

            <BlurText
              text="Doutor em Neurociências e PhD em Psiquiatria e Saúde Mental"
              animateBy="words"
              delay={100}
              className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
            />

            <p className="mt-6 text-lg text-muted-foreground">
              Formação internacional pela UCLA e Universidade de Paris. Minha missão é transformar vidas através da ciência, do cuidado clínico e da educação em saúde mental.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-lg border border-gold/40 bg-card p-4">
              <Award className="h-6 w-6 text-gold" />
              <p className="text-sm text-cream/90">
                Atuação clínica, acadêmica e empresarial com foco em excelência.
              </p>
            </div>

            <a
              href="https://www.instagram.com/weslley_demorais/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80"
            >
              <Instagram className="h-4 w-4" />
              @weslley_demorais
            </a>
          </div>

          {/* IMAGEM NOVA */}
          <Reveal className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 shadow-elegant">
              
              <img
                src="https://res.cloudinary.com/duxxfpukn/image/upload/v1784076304/8408b13e-2009-424a-a730-7dffe91e5418_agfr5t.jpg"
                alt="Dr. Weslley Demorais"
                className="h-[520px] w-full object-cover object-top"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </Reveal>

        </div>
      </section>

      {/* CARDS */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <Card className="h-full p-8">
                  <b.icon className="h-8 w-8 text-gold" />
                  <h2 className="mt-4 text-2xl font-semibold">{b.title}</h2>
                  <p className="mt-3 text-muted-foreground">{b.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FRASE + NÚMEROS */}
      <section className="border-t border-border/60 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          
          <Reveal>
            <p className="font-display text-3xl sm:text-4xl text-gray-900">
              "Em minha vida luto pela excelência e para honrar a Deus."
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              { to: 1300, label: "pacientes atendidos" },
              { to: 1000, label: "profissionais formados" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="font-display text-5xl text-gold">
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