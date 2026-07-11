import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface PostForm {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  published: boolean;
}

const emptyPost: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  category: "",
  published: true,
};

function Admin() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<PostForm | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  const { data: posts } = useQuery({
    queryKey: ["admin-posts"],
    enabled: isAdmin,
    queryFn: async () => (await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const { data: messages } = useQuery({
    queryKey: ["admin-messages"],
    enabled: isAdmin,
    queryFn: async () => (await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const { data: subs } = useQuery({
    queryKey: ["admin-subs"],
    enabled: isAdmin,
    queryFn: async () => (await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const savePost = async () => {
    if (!editing) return;
    if (!editing.title.trim()) return toast.error("Informe um título.");
    setSaving(true);
    const payload = {
      title: editing.title,
      slug: editing.slug || slugify(editing.title),
      excerpt: editing.excerpt || null,
      content: editing.content,
      cover_image_url: editing.cover_image_url || null,
      category: editing.category || null,
      published: editing.published,
    };
    const res = editing.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload);
    setSaving(false);
    if (res.error) {
      toast.error(res.error.code === "23505" ? "Já existe um artigo com esse endereço (slug)." : "Erro ao salvar.");
      return;
    }
    toast.success("Artigo salvo!");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
  };

  const deletePost = async (id: string) => {
    if (!confirm("Excluir este artigo?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error("Erro ao excluir.");
    toast.success("Artigo excluído.");
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
  };

  if (loading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center text-muted-foreground">Carregando...</div>
      </SiteLayout>
    );
  }

  if (session && !isAdmin) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-lg px-4 py-32 text-center">
          <h1 className="text-3xl font-semibold">Acesso restrito</h1>
          <p className="mt-3 text-muted-foreground">
            Sua conta ainda não tem permissão de administrador. Solicite que o acesso de
            administrador seja concedido à sua conta.
          </p>
          <Button className="mt-6" variant="outline" onClick={signOut}>
            Sair
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">Painel</h1>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="mr-1 h-4 w-4" /> Sair
          </Button>
        </div>

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList>
            <TabsTrigger value="posts">Blog ({posts?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="messages">Mensagens ({messages?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="subs">Newsletter ({subs?.length ?? 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <Button onClick={() => setEditing({ ...emptyPost })}>
              <Plus className="mr-1 h-4 w-4" /> Novo artigo
            </Button>
            <div className="mt-6 space-y-3">
              {posts?.map((p) => (
                <Card key={p.id} className="flex items-center justify-between border-border/60 bg-card p-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{p.title}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${p.published ? "bg-gold/20 text-gold" : "bg-secondary text-muted-foreground"}`}
                      >
                        {p.published ? "Publicado" : "Rascunho"}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">/{p.slug}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        setEditing({
                          id: p.id,
                          title: p.title,
                          slug: p.slug,
                          excerpt: p.excerpt ?? "",
                          content: p.content ?? "",
                          cover_image_url: p.cover_image_url ?? "",
                          category: p.category ?? "",
                          published: p.published,
                        })
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deletePost(p.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              {posts?.length === 0 && <p className="text-muted-foreground">Nenhum artigo ainda.</p>}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="mt-6 space-y-3">
            {messages?.map((m) => (
              <Card key={m.id} className="border-border/60 bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(m.created_at).toLocaleString("pt-BR")}
                  </span>
                </div>
                <p className="text-sm text-gold">{m.email}{m.phone ? ` · ${m.phone}` : ""}</p>
                {m.subject && <p className="mt-1 text-sm font-medium">{m.subject}</p>}
                <p className="mt-1 text-sm text-muted-foreground">{m.message}</p>
              </Card>
            ))}
            {messages?.length === 0 && <p className="text-muted-foreground">Nenhuma mensagem ainda.</p>}
          </TabsContent>

          <TabsContent value="subs" className="mt-6 space-y-2">
            {subs?.map((s) => (
              <Card key={s.id} className="flex items-center justify-between border-border/60 bg-card p-4">
                <div>
                  <span className="font-medium">{s.name || "—"}</span>
                  <span className="ml-2 text-sm text-gold">{s.email}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(s.created_at).toLocaleDateString("pt-BR")}
                </span>
              </Card>
            ))}
            {subs?.length === 0 && <p className="text-muted-foreground">Nenhum inscrito ainda.</p>}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-card sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Editar artigo" : "Novo artigo"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      title: e.target.value,
                      slug: editing.id ? editing.slug : slugify(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Endereço (slug)</Label>
                  <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Imagem de capa (URL)</Label>
                <Input
                  value={editing.cover_image_url}
                  placeholder="https://..."
                  onChange={(e) => setEditing({ ...editing, cover_image_url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Resumo</Label>
                <Textarea
                  rows={2}
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Conteúdo</Label>
                <Textarea
                  rows={8}
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={editing.published}
                  onCheckedChange={(v) => setEditing({ ...editing, published: v })}
                />
                <Label>Publicar imediatamente</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={savePost} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
