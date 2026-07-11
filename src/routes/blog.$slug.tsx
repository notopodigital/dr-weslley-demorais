import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/animations/Reveal";
import { PostContent } from "@/components/PostContent";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: `Artigo | Dr. Weslley Demorais` },
      { property: "og:title", content: `Artigo | Dr. Weslley Demorais` },
    ],
  }),
  component: BlogPost,
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogPost() {
  const { slug } = Route.useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Button asChild variant="ghost" size="sm" className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao blog
          </Link>
        </Button>

        {isLoading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : !post ? (
          <div className="py-10 text-center">
            <h1 className="text-3xl font-semibold">Artigo não encontrado</h1>
            <p className="mt-3 text-muted-foreground">
              Este artigo pode ter sido removido ou ainda não foi publicado.
            </p>
          </div>
        ) : (
          <Reveal>
            {post.category && (
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                {post.category}
              </span>
            )}
            <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">{formatDate(post.created_at)}</p>

            {post.cover_image_url && (
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="mt-8 w-full rounded-2xl border border-border/60 object-cover"
              />
            )}

            {post.excerpt && (
              <p className="mt-8 text-xl leading-relaxed text-cream/90">{post.excerpt}</p>
            )}

            <div className="mt-6">
              <PostContent content={post.content} />
            </div>
          </Reveal>
        )}
      </article>
    </SiteLayout>
  );
}
