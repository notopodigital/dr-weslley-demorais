import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl font-semibold">
            Dr. Weslley <span className="text-gold">Demorais</span>
          </h3>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Psicoterapeuta PhD em Psiquiatria e Saúde Mental. Doutor em neurociência e
            genética. Consultas on-line e presenciais.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/sobre", label: "Sobre" },
              { to: "/cursos", label: "Cursos" },
              { to: "/blog", label: "Blog" },
              { to: "/newsletter", label: "Newsletter" },
              { to: "/contato", label: "Contato" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">Contato</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" /> Belo Horizonte, MG
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" /> consultoriodrweslleydemorais@gmail.com


            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-gold" /> @weslley_demorais
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dr. Weslley Demorais. Todos os direitos reservados.
      </div>
    </footer>
  );
}
