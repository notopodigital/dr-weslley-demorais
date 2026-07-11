import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, GraduationCap, PlayCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cursos")({
  head: () => ({
    meta: [
      { title: "Cursos | Dr. Weslley Demorais" },
      {
        name: "description",
        content:
          "Cursos e formações do Dr. Weslley Demorais em saúde mental, autismo, TDAH e protocolos padrão-ouro para profissionais e famílias.",
      },
      { property: "og:title", content: "Cursos | Dr. Weslley Demorais" },
      {
        property: "og:description",
        content: "Formações com técnicas e protocolos padrão-ouro em saúde mental.",
      },
    ],
  }),
  component: Cursos,
});

const courses = [
  {
    icon: BookOpen,
    title: "Fundamentos do Autismo",
    text: "Compreenda o espectro autista com base científica e aprenda a apoiar crianças e adultos com técnicas comprovadas.",
    level: "Profissionais e famílias",
  },
  {
    icon: GraduationCap,
    title: "TDAH na Prática Clínica",
    text: "Avaliação, manejo e protocolos padrão-ouro para o transtorno de déficit de atenção e hiperatividade.",
    level: "Profissionais de saúde",
  },
  {
    icon: PlayCircle,
    title: "Orientação Parental",
    text: "Como vencer distúrbios do sono, seletividade alimentar e outros sintomas dos transtornos no dia a dia.",
    level: "Mães e pais",
  },
];

const benefits = [
  "Baseado nos melhores estudos científicos",
  "Protocolos padrão-ouro de atendimento",
  "Aulas com aplicação clínica real",
  "Certificação ao final do curso",
];

function Cursos() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Formações"
        title="Cursos"
        description="Ensino as melhores técnicas de atendimento e os protocolos padrão-ouro para cada um dos meus alunos. Conheça as formações disponíveis."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {courses.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <Card className="flex h-full flex-col border-border/60 bg-card p-8">
                  <c.icon className="h-9 w-9 text-gold" />
                  <span className="mt-4 text-xs font-medium uppercase tracking-widest text-gold">
                    {c.level}
                  </span>
                  <h2 className="mt-2 text-2xl font-semibold">{c.title}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{c.text}</p>
                  <Button asChild variant="outline" className="mt-6">
                    <Link to="/contato">Tenho interesse</Link>
                  </Button>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-white py-16 sm:py-20">
  <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
    
    <Reveal>
      <h2 className="text-3xl font-semibold sm:text-4xl text-gray-900">
        Por que estudar comigo?
      </h2>

      <p className="mt-4 text-gray-600">
        Mais de 1000 profissionais já foram formados por mim. Levo para a sala de aula
        a experiência clínica com mais de 1300 pacientes atendidos.
      </p>
    </Reveal>

    <Reveal delay={0.1}>
      <ul className="space-y-4">
        {benefits.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span className="text-gray-700">{b}</span>
          </li>
        ))}
      </ul>
    </Reveal>

  </div>
</section>
    </SiteLayout>
  );
}
