import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Instagram, Mail, MapPin, MonitorSmartphone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato | Dr. Weslley Demorais" },
      {
        name: "description",
        content:
          "Entre em contato para agendar uma consulta on-line ou presencial em Belo Horizonte com o Dr. Weslley Demorais.",
      },
      { property: "og:title", content: "Contato | Dr. Weslley Demorais" },
      {
        property: "og:description",
        content: "Agende uma consulta on-line ou presencial em Belo Horizonte.",
      },
    ],
  }),
  component: Contato,
});

function Contato() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email.trim().toLowerCase(),
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível enviar. Tente novamente.");
      return;
    }
    setDone(true);
    toast.success("Mensagem enviada!");
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Vamos conversar"
        title="Contato"
        description="Consultas on-line e presenciais em Belo Horizonte. Preencha o formulário e retornarei o mais breve possível."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-5">
              {[
                { icon: MapPin, title: "Localização", text: "Belo Horizonte, MG — Brasil" },
                { icon: MonitorSmartphone, title: "Atendimento", text: "On-line e presencial" },
                { icon: Mail, title: "E-mail", text: "contato@weslleydemorais.com" },
                { icon: Instagram, title: "Instagram", text: "@weslley_demorais" },
              ].map((c) => (
                <Card key={c.title} className="flex items-start gap-4 border-border/60 bg-card p-5">
                  <c.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="border-border/60 bg-card p-8">
              {done ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
                  <h2 className="mt-4 text-2xl font-semibold">Mensagem enviada!</h2>
                  <p className="mt-2 text-muted-foreground">
                    Obrigado pelo contato. Retornarei o mais breve possível.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome *</Label>
                      <Input id="name" required value={form.name} onChange={update("name")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" type="email" required value={form.email} onChange={update("email")} />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" value={form.phone} onChange={update("phone")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input id="subject" value={form.subject} onChange={update("subject")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea id="message" required rows={5} value={form.message} onChange={update("message")} />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar mensagem"}
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
