import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Instagram,
  Mail,
  MapPin,
  MonitorSmartphone,
  Phone,
} from "lucide-react";
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
  component: Contato,
});

function Contato() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
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
      toast.error("Erro ao enviar.");
      return;
    }

    setDone(true);
    toast.success("Redirecionando para WhatsApp...");

    window.location.href =
      "https://wa.me/message/LXHVU57LB7XLG1";
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Vamos conversar"
        title="Contato"
        description="Consultas presenciais ou por teleconsulta. Preencha o formulário e fale direto pelo WhatsApp."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2 items-start">
          
          {/* ESQUERDA */}
          <Reveal>
            <div className="space-y-5">

              <Card className="flex items-start gap-4 p-5">
                <MapPin className="h-6 w-6 text-gold" />
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-sm text-muted-foreground">
                    R. Rio Grande do Norte, 23 - Santa Efigênia <br />
                    Belo Horizonte - MG, 30130-130
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4 p-5">
                <MonitorSmartphone className="h-6 w-6 text-gold" />
                <div>
                  <h3 className="font-semibold">Atendimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Presencial e teleconsulta
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4 p-5">
                <Phone className="h-6 w-6 text-gold" />
                <div>
                  <h3 className="font-semibold">Telefone</h3>
                  <p className="text-sm text-muted-foreground">
                    (31) 99241-5081
                  </p>
                </div>
              </Card>

              <Card className="flex items-start gap-4 p-5">
                <Mail className="h-6 w-6 text-gold" />
                <div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p className="text-sm text-muted-foreground">
                    consultoriodrweslleydemorais@gmail.com
                  </p>
                </div>
              </Card>

              {/* INSTAGRAM CLICÁVEL */}
              <Card className="flex items-start gap-4 p-5">
                <Instagram className="h-6 w-6 text-gold" />
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <a
                    href="https://www.instagram.com/weslley_demorais/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-gold transition"
                  >
                    @weslley_demorais
                  </a>
                </div>
              </Card>

              {/* MAPA */}
              <div className="overflow-hidden rounded-xl border mt-2">
                <iframe
                  src="https://www.google.com/maps?q=R.+Rio+Grande+do+Norte,+23+-+Santa+Efigênia,+Belo+Horizonte+-+MG&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>

            </div>
          </Reveal>

          {/* DIREITA */}
          <Reveal delay={0.1}>
            <Card className="p-8 h-fit sticky top-24">
              {done ? (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
                  <h2 className="mt-4 text-2xl font-semibold">
                    Redirecionando...
                  </h2>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label>Nome *</Label>
                      <Input required value={form.name} onChange={update("name")} />
                    </div>
                    <div>
                      <Label>E-mail *</Label>
                      <Input type="email" required value={form.email} onChange={update("email")} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label>Telefone</Label>
                      <Input value={form.phone} onChange={update("phone")} />
                    </div>
                    <div>
                      <Label>Assunto</Label>
                      <Input value={form.subject} onChange={update("subject")} />
                    </div>
                  </div>

                  <div>
                    <Label>Mensagem *</Label>
                    <Textarea rows={5} required value={form.message} onChange={update("message")} />
                  </div>

                  <Button type="submit" className="w-full">
                    {loading ? "Enviando..." : "Falar no WhatsApp"}
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