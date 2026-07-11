import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { PostContent } from "@/components/PostContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Dr. Weslley Demorais" },
      {
        name: "description",
        content:
          "Artigos sobre saúde mental, psiquiatria, autismo, TDAH e desenvolvimento escritos pelo Dr. Weslley Demorais.",
      },
      { property: "og:title", content: "Blog | Dr. Weslley Demorais" },
      {
        property: "og:description",
        content: "Artigos sobre saúde mental e psiquiatria.",
      },
    ],
  }),
  component: Blog,
});

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  created_at: string;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Blog() {
  const [active, setActive] = useState<Post | null>(null);
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, content, cover_image_url, category, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      return (data ?? []) as Post[];
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Conteúdo"
        title="Blog"
        description="Reflexões, estudos e orientações sobre saúde mental, transtornos e desenvolvimento."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {isLoading ? (
            <p className="text-muted-foreground">Carregando artigos...</p>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.1}>
                  <Card className="group flex h-full flex-col overflow-hidden border-border/60 bg-card transition-colors hover:border-gold/50">
                    <div className="aspect-[16/10] overflow-hidden bg-secondary">
                      {p.cover_image_url && (
                        <img
                          src={p.cover_image_url}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {p.category && (
                        <span className="text-xs font-medium uppercase tracking-widest text-gold">
                          {p.category}
                        </span>
                      )}
                      <h2 className="mt-2 text-xl font-semibold leading-snug">{p.title}</h2>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                        {p.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(p.created_at)}</span>
                      </div>
                      <Button
                        className="mt-4 w-full"
                        variant="outline"
                        onClick={() => setActive(p)}
                      >
                        Saber mais <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Em breve novos artigos serão publicados aqui.</p>
          )}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-card sm:max-w-3xl">
          <DialogHeader>
            {active?.category && (
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                {active.category}
              </span>
            )}
            <DialogTitle className="text-3xl font-semibold leading-tight">
              {active?.title}
            </DialogTitle>
          </DialogHeader>
          {active && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">{formatDate(active.created_at)}</p>
              {active.cover_image_url && (
                <img
                  src={active.cover_image_url}
                  alt={active.title}
                  className="mt-4 w-full rounded-2xl border border-border/60 object-cover"
                />
              )}
              {active.excerpt && (
                <p className="mt-6 text-xl leading-relaxed text-cream/90">{active.excerpt}</p>
              )}
              <div className="mt-6">
                <PostContent content={active.content} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
