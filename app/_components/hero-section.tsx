"use client";

import Link from "next/link";
import { MoveUpRight, Zap, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";

// ─── Stats strip ─────────────────────────────────────────────────────────────

const stats = [
  {
    id: "experiencia",
    icon: Sparkles,
    label: "Experiencia",
    value: "Zero-code",
    detail: "Pensado para equipos que quieren ejecutar, no programar.",
    accent: "#d9ff00",
    glow: "rgba(217,255,0,0.18)",
    iconBg: "rgba(217,255,0,0.1)",
  },
  {
    id: "arranque",
    icon: Clock,
    label: "Tiempo de Arranque",
    value: "Minutos",
    detail: "Sin setup complejo ni implementaciones largas para empezar.",
    accent: "#8f90ff",
    glow: "rgba(143,144,255,0.2)",
    iconBg: "rgba(143,144,255,0.1)",
  },
  {
    id: "casos",
    icon: Zap,
    label: "Casos de Uso",
    value: "Reales",
    detail: "Soporte, ventas, onboarding y flujos internos con valor claro.",
    accent: "#d9ff00",
    glow: "rgba(217,255,0,0.18)",
    iconBg: "rgba(217,255,0,0.1)",
  },
] as const;

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.75 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 50px ${stat.glow}`,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ "--accent": stat.accent, "--glow": stat.glow } as React.CSSProperties}
      className="stat-card group relative flex flex-col gap-4 rounded-2xl border border-white/8 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all duration-200"
    >
      {/* Top edge highlight on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[1.4rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg,transparent,${stat.accent}66,transparent)` }}
      />

      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: stat.iconBg }}
        >
          <Icon className="h-5 w-5" style={{ color: stat.accent }} strokeWidth={1.7} />
        </div>
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/45">
          {stat.label}
        </p>
      </div>

      <div>
        <p
          className="text-[2rem] font-semibold leading-none tracking-[-0.055em]"
          style={{ color: stat.accent }}
        >
          {stat.value}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/54">{stat.detail}</p>
      </div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <div
      id="inicio"
      className="relative flex flex-1 flex-col items-center justify-center gap-14 pb-4 pt-10 sm:pt-16"
    >

      {/* ── Copy ── */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-5 text-center sm:px-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-[#d9ff00]/20 bg-[#d9ff00]/8 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#b8d600]"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d9ff00]" />
          IA sin código · Instalación en segundos
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-balance font-heading font-bold text-[2.5rem] leading-[0.95] tracking-[-0.065em] text-white sm:text-[3.8rem] lg:text-[5rem]"
        >
          Instala agentes de IA{" "}
          <span className="bg-gradient-to-r from-[#d7f209] via-[#a8e800] to-[#858BE3] bg-clip-text text-transparent">
            en minutos,
          </span>{" "}
          sin código
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8"
        >
          Transforma tu negocio con agentes inteligentes listos para usar.
          Explora, instala y ejecuta en segundos.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/marketplace"
              className="group inline-flex items-center gap-2 rounded-full border border-[#d9ff00]/40 bg-[#d9ff00] px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_28px_rgba(217,255,0,0.35)] transition hover:bg-[#e5ff45] hover:shadow-[0_0_42px_rgba(217,255,0,0.55)]"
            >
              Explorar Marketplace
              <MoveUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/12"
            >
              Ver beneficios
              <MoveUpRight className="size-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative z-10 w-full max-w-5xl px-5 sm:px-8">
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 h-px origin-left bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>

      {/* ── Footer strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="relative z-10 flex w-full items-center justify-between px-5 sm:px-8"
      >
        <p className="font-heading text-[0.62rem] uppercase tracking-[0.18em] text-[#D7F205]">
          Miunix.{" "}
          <span className="text-[#6b8510]">2026</span>
        </p>
        <motion.a
          href="#features"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#222] px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#6b8510] transition hover:border-[#38451a] hover:text-[#99bf17]"
        >
          Scroll para explorar
          <MoveUpRight className="size-3.5" />
        </motion.a>
      </motion.div>
    </div>
  );
}
