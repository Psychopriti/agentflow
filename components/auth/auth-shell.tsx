"use client";

import Link from "next/link";
import { motion } from "motion/react";

type AuthShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  currentPage: "login" | "register";
  children: React.ReactNode;
  message?: string;
};

export function AuthShell({
  title,
  eyebrow,
  description,
  currentPage,
  children,
  message,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen flex-col bg-[#09090b] px-5 py-6 text-white sm:px-8">
      <section className="mx-auto grid w-full max-w-6xl flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        {/* ── Panel izquierdo (branding + copy) ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="
            glass-card rounded-3xl p-8 sm:p-10
            bg-[radial-gradient(ellipse_at_top_left,rgba(215,242,9,0.07),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(133,139,227,0.09),transparent_55%)]
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              font-heading font-bold text-[1.45rem] uppercase tracking-[-0.05em] text-[#d7f209]
              transition-opacity duration-200 hover:opacity-75
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60 focus-visible:rounded-sm
            "
          >
            Miunix
          </Link>

          <div className="mt-10 max-w-lg space-y-5">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="
                font-heading font-bold text-[2.2rem] leading-[1.05] tracking-[-0.05em] text-white
                sm:text-[3rem]
              "
            >
              {title}
            </motion.h1>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.45 }}
              className="font-sans text-base leading-7 text-zinc-400"
            >
              {description}
            </motion.p>

            {/* Tab switcher Login / Registro */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.4 }}
              className="flex flex-wrap gap-2 pt-2"
              role="tablist"
            >
              <Link
                href="/login"
                role="tab"
                aria-selected={currentPage === "login"}
                className={`
                  inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-medium
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60
                  ${
                    currentPage === "login"
                      ? "bg-[#858BE3] text-white shadow-[0_0_16px_rgba(133,139,227,0.4)]"
                      : "border border-white/10 bg-white/4 text-zinc-400 hover:bg-white/8 hover:text-white"
                  }
                `}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                role="tab"
                aria-selected={currentPage === "register"}
                className={`
                  inline-flex min-h-[44px] items-center rounded-full px-5 py-2.5 text-sm font-medium
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7f209]/40
                  ${
                    currentPage === "register"
                      ? "bg-[#d7f209] text-[#09090b] shadow-[0_0_16px_rgba(215,242,9,0.35)]"
                      : "border border-white/10 bg-white/4 text-zinc-400 hover:bg-white/8 hover:text-white"
                  }
                `}
              >
                Crear cuenta
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Panel derecho (formulario) ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          {/* Mensaje de feedback (error / éxito) */}
          {message ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mb-5 rounded-2xl border border-[#d7f209]/20
                bg-[#d7f209]/8 px-5 py-4
                font-sans text-sm leading-6 text-[#d7f209]
              "
              role="alert"
            >
              {message}
            </motion.div>
          ) : null}

          {/* Card del formulario */}
          <div className="glass-card rounded-3xl p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:p-8">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
              {eyebrow}
            </p>
            {children}
          </div>
        </motion.div>

      </section>
    </main>
  );
}
