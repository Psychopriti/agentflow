"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { label: "Inicio",      href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Workflows",   href: "/workflows" },
  { label: "Dashboard",   href: "/dashboard" },
  { label: "Developers",  href: "/developers" },
] as const;

type NavItem = { label: string; href: string };

// ── Mobile drawer ─────────────────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
  currentPath,
  items,
}: {
  open: boolean;
  onClose: () => void;
  currentPath?: string;
  items: NavItem[];
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.nav
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(17rem,90vw)] flex-col border-l border-white/8 bg-[#0c0c0f]/98 px-5 py-7 backdrop-blur-2xl"
            aria-label="Menú de navegación móvil"
          >
            <button
              type="button"
              onClick={onClose}
              className="mb-7 self-end flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/50 transition hover:bg-white/8 hover:text-white"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>

            <Link
              href="/"
              onClick={onClose}
              className="mb-7 font-heading font-bold text-[1.25rem] uppercase tracking-[-0.05em] text-[#d7f209]"
            >
              Miunix
            </Link>

            <ul className="flex flex-col gap-1">
              {items.map((item, i) => {
                const isActive = item.href === currentPath;
                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-[48px] items-center rounded-xl px-4 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#858BE3]/15 text-[#858BE3]"
                          : "text-white/60 hover:bg-white/6 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main client header shell ──────────────────────────────────────────────────

export function HeaderClient({
  currentPath,
  visibleItems,
  authControls,
}: {
  currentPath?: string;
  visibleItems: NavItem[];
  authControls: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-white/6 px-4 py-0 sm:px-8 transition-all duration-200">
        <div className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between gap-3 sm:h-16">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 font-heading font-bold text-[1.35rem] uppercase tracking-[-0.05em] text-[#d7f209] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60 focus-visible:rounded-sm"
          >
            Miunix
          </Link>

          {/* Desktop nav — hidden below md */}
          <nav className="hidden flex-1 justify-center md:flex" aria-label="Navegación principal">
            {visibleItems.length > 0 && (
              <ul className="flex items-center gap-1 rounded-full border border-white/8 bg-zinc-900/60 px-2 py-1.5 backdrop-blur-sm">
                {visibleItems.map((item) => {
                  const isActive = item.href === currentPath;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`inline-flex min-h-[36px] min-w-[44px] items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60 ${
                          isActive
                            ? "bg-[#858BE3] text-white shadow-[0_0_14px_rgba(133,139,227,0.35)]"
                            : "text-zinc-400 hover:bg-white/8 hover:text-zinc-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2">
            {authControls}

            {/* Hamburger — md and below */}
            {visibleItems.length > 0 && (
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:bg-white/8 hover:text-white md:hidden"
                aria-label="Abrir menú de navegación"
                aria-expanded={drawerOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentPath={currentPath}
        items={visibleItems}
      />
    </>
  );
}
