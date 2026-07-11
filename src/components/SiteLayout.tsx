import { type ReactNode } from "react";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface SiteLayoutProps {
  children: ReactNode;
  /** disable top padding when the page has a full-bleed hero */
  fullBleed?: boolean;
}

/** Wraps every page with nav, footer, and an enter/exit animation. */
export function SiteLayout({ children, fullBleed = false }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        className={fullBleed ? "flex-1" : "flex-1 pt-16"}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
