import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/newsletter")({
  head: () => ({
    meta: [
      { title: "Newsletter | Dr. Weslley Demorais" },
      {
        name: "description",
        content:
          "Receba conteúdos exclusivos sobre saúde mental, psiquiatria e desenvolvimento diretamente no seu e-mail.",
      },
      { property: "og:title", content: "Newsletter | Dr. Weslley Demorais" },
      {
        property: "og:description",
        content: "Conteúdos exclusivos sobre saúde mental no seu e-mail.",
      },
    ],
  }),
  component: Newsletter,
});

function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ name: name || null, email: email.trim().toLowerCase() });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.error("Este e-mail já está inscrito.");
      } else {
        toast.error("Não foi possível inscrever. Tente novamente.");
      }
      return;
    }
    setDone(true);
    toast.success("Inscrição confirmada!");
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Fique por dentro"
        title="Newsletter"
        description="Receba conteúdos exclusivos sobre saúde mental, psiquiatria, autismo e desenvolvimento diretamente no seu e-mail."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <Reveal>
            <Card className="border-border/60 bg-card p-8 sm:p-10">
              {done ? (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
                  <h2 className="mt-4 text-2xl font-semibold">Inscrição confirmada!</h2>
                  <p className="mt-2 text-muted-foreground">
                    Obrigado por se inscrever. Em breve você receberá novidades.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-gold" />
                    <p className="text-muted-foreground">
                      Preencha os campos abaixo para se inscrever.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@email.com"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Enviando..." : "Quero me inscrever"}
                  </Button>
                </form>
              )}
            </Card>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
