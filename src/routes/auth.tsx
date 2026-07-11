import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SiteLayout } from "@/components/SiteLayout";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export const Route = createFileRoute("/auth")({
  component: Auth,
});


function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const { session } = useAuth();

  const navigate = useNavigate();


  useEffect(() => {
    if (session) {
      navigate({ to: "/admin" });
    }
  }, [session, navigate]);



  const submit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);


    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });


    setLoading(false);


    if (error) {
      toast.error("E-mail ou senha inválidos.");
      return;
    }


    toast.success("Login realizado com sucesso!");

    navigate({
      to: "/admin",
    });

  };



  return (
    <SiteLayout>

      <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">

        <Card className="w-full max-w-md border-border/60 bg-card p-8">

          <h1 className="text-3xl font-semibold">
            Painel do administrador
          </h1>


          <p className="mt-2 text-sm text-muted-foreground">
            Entre para gerenciar o blog e visualizar mensagens.
          </p>



          <form
            onSubmit={submit}
            className="mt-6 space-y-5"
          >

            <div className="space-y-2">

              <Label htmlFor="email">
                E-mail
              </Label>

              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>



            <div className="space-y-2">

              <Label htmlFor="password">
                Senha
              </Label>


              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>



            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >

              {loading
                ? "Entrando..."
                : "Entrar"
              }

            </Button>


          </form>


        </Card>

      </section>

    </SiteLayout>
  );
}