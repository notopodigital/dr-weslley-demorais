import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowRight, Brain, GraduationCap, HeartHandshake, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/animations/Reveal";
import BlurText from "@/components/animations/BlurText";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroAsset from "@/assets/header-hero.png.asset.json";
import mobileHeroAsset from "@/assets/mobile-hero.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const specialties = [
  {
    icon: Brain,
    title: "Atuação Terapêutica",
    text: "Especialista em transtornos e distúrbios. Anos estudando e melhorando a vida de crianças e adultos autistas, com TDAH e outros transtornos.",
  },
  {
    icon: GraduationCap,
    title: "Professor",
    text: "Fui atrás das melhores técnicas de atendimento e dos protocolos padrão-ouro e ensino isto para cada um dos meus alunos e nas universidades.",
  },
  {
    icon: HeartHandshake,
    title: "Orientador de mães e pais",
    text: "Atendo famílias que precisam de mim, ensinando como vencer distúrbios do sono, seletividade alimentar e vários outros sintomas dos transtornos.",
  },
  {
    icon: Users,
    title: "Empresário",
    text: "Faço a gestão ativamente de uma holding com 8 empresas no mercado de educação e saúde.",
  },
];

function Index() {
  const { data: posts } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image_url, category, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });

  return (
    <SiteLayout fullBleed>
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={heroAsset.url}
            alt="Dr. Weslley Demorais"
            className="hidden h-full w-full object-cover object-[75%_top] sm:block"
          />
          <img
            src={mobileHeroAsset.url}
            alt="Dr. Weslley Demorais"
            className="h-full w-full object-cover object-top sm:hidden"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold"
            >
            ATENDIMENTO ESPECIALIZADO EM SAÚDE MENTAL
            </motion.p>
            <BlurText
              text="Doutor Weslley Demorais"
              animateBy="words"
              delay={120}
              className="font-display text-4xl font-semibold leading-tight sm:text-6xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-6 max-w-xl text-lg text-cream/85"
            >
              Psicoterapeuta e professor PhD em Psiquiatria e Saúde Mental
Doutor em Neurociência e Genética com formação na Universidade da Califórnia e na Universidade de Paris.

Consultas on-line e presenciais em Belo Horizonte
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button asChild size="lg">
                <a
  href="https://wa.me/message/LXHVU57LB7XLG1"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center"
>
  Agendar consulta
  <ArrowRight className="ml-1 h-4 w-4" />
</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/sobre">Conheça minha história</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-y border-border/60 bg-navy-deep py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <ScrollReveal baseOpacity={0.05} enableBlur baseRotation={4} blurStrength={8}>
            “Em minha vida luto pela excelência e para honrar a Deus, que não se deixou vencer
            em generosidade.”
          </ScrollReveal>
        </div>
      </section>

      {/* STATS — cream band */}
      <section className="bg-cream py-20 text-navy-deep">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2 sm:px-6">
          {[
            { to: 1300, label: "pacientes atendidos" },
            { to: 1000, label: "profissionais formados por mim" },
          ].map((s) => (
            <Reveal key={s.label}>
              <Card className="border-navy/10 bg-background/5 p-10 text-center shadow-none">
                <div className="font-display text-5xl font-semibold text-navy sm:text-6xl">
                  +<CountUp to={s.to} separator="." duration={2.4} />
                </div>
                <p className="mt-3 text-lg text-navy/70">{s.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>


      {/* SPECIALTIES */}
      <section className="bg-navy-deep py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Como posso ajudar
            </p>
            <h2 className="mt-3 text-center text-4xl font-semibold">Áreas de atuação</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {specialties.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <Card className="h-full border-border/60 bg-card p-8 transition-colors hover:border-gold/50">
                  <s.icon className="h-9 w-9 text-gold" />
                  <h3 className="mt-5 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">Blog</p>
                <h2 className="mt-3 text-4xl font-semibold">Últimos artigos</h2>
              </div>
              <Button asChild variant="ghost" className="hidden sm:inline-flex">
                <Link to="/blog">
                  Ver todos <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          {posts && posts.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }}>
                    <Card className="group h-full overflow-hidden border-border/60 bg-card transition-colors hover:border-gold/50">
                      <div className="aspect-[16/10] overflow-hidden bg-secondary">
                        {p.cover_image_url && (
                          <img
                            src={p.cover_image_url}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        {p.category && (
                          <span className="text-xs font-medium uppercase tracking-widest text-gold">
                            {p.category}
                          </span>
                        )}
                        <h3 className="mt-2 text-xl font-semibold leading-snug">{p.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                          {p.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="mt-10 text-muted-foreground">
                Em breve novos artigos serão publicados aqui.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* WHITE BAND — CTA */}
      <section className="bg-cream py-20 text-navy-deep">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-4xl font-light sm:text-5xl">
              Entre em <span className="font-extrabold">contato:</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-navy/80">
              Agende sua consulta on-line ou presencial em Belo Horizonte e dê o primeiro
              passo para cuidar da sua saúde mental.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/contato">
                Falar com a assessoria <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
