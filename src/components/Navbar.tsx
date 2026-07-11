import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/cursos", label: "Cursos" },
  { to: "/newsletter", label: "Newsletter" },
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" },
] as const;

const whatsapp =
  "https://wa.me/553191732070?text=Olá,%20gostaria%20de%20agendar%20uma%20consulta";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/duxxfpukn/image/upload/v1783791424/dr_vrqm0i.png"
            alt="Logo Dr. Weslley"
            className="h-9 w-9 rounded-full object-cover border border-gold/50"
          />

          <span className="font-display text-xl font-semibold tracking-tight">
            Dr. Weslley{" "}
            <span className="text-gold">
              Demorais
            </span>
          </span>
        </Link>


        {/* MENU DESKTOP */}
        <div className="hidden items-center gap-1 md:flex">

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === link.to && "text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}


          {/* WHATSAPP DESKTOP */}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative
              z-[9999]
              ml-3
              inline-flex
              h-9
              items-center
              justify-center
              rounded-md
              bg-primary
              px-5
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:bg-primary/90
            "
          >
            Agendar consulta
          </a>

        </div>



        {/* MENU MOBILE */}
        <div className="md:hidden">

          <Sheet
            open={open}
            onOpenChange={setOpen}
          >

            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>


            <SheetContent
              side="right"
              className="w-72 bg-background"
            >

              <SheetTitle className="mb-6 font-display text-xl text-gold">
                Menu
              </SheetTitle>


              <div className="flex flex-col gap-1">

                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground",
                      pathname === link.to && "text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}


                {/* WHATSAPP MOBILE */}
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="
                    mt-4
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    rounded-md
                    bg-primary
                    px-4
                    text-sm
                    font-medium
                    text-primary-foreground
                    hover:bg-primary/90
                  "
                >
                  Agendar consulta
                </a>


              </div>

            </SheetContent>

          </Sheet>

        </div>

      </nav>
    </header>
  );
}