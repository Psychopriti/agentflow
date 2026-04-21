"use client";

import { motion } from "motion/react";
import { ShoppingBag, Zap, Play, Sparkles } from "lucide-react";

// ─── Feature data ─────────────────────────────────────────────────────────────

const features = [
  {
    id: "marketplace",
    icon: ShoppingBag,
    title: "Marketplace de Agentes",
    description: "Explora y elige entre docenas de agentes listos para usar.",
    iconBg: "rgba(143, 144, 255, 0.15)",
    iconColor: "#8f90ff",
    glowColor: "rgba(143, 144, 255, 0.20)",
    borderHover: "rgba(143, 144, 255, 0.35)",
  },
  {
    id: "one-click",
    icon: Zap,
    title: "Instalación en 1 Clic",
    description: "Agrega cualquier agente a tu cuenta en segundos.",
    iconBg: "rgba(217, 255, 0, 0.12)",
    iconColor: "#d9ff00",
    glowColor: "rgba(217, 255, 0, 0.16)",
    borderHover: "rgba(217, 255, 0, 0.30)",
  },
  {
    id: "instant-run",
    icon: Play,
    title: "Ejecución Instantánea",
    description: "Obtén resultados en minutos sin complicaciones.",
    iconBg: "rgba(143, 144, 255, 0.15)",
    iconColor: "#8f90ff",
    glowColor: "rgba(143, 144, 255, 0.20)",
    borderHover: "rgba(143, 144, 255, 0.35)",
  },
  {
    id: "no-code",
    icon: Sparkles,
    title: "Sin Código Requerido",
    description: "Todo funciona con lenguaje natural, sin programar.",
    iconBg: "rgba(217, 255, 0, 0.12)",
    iconColor: "#d9ff00",
    glowColor: "rgba(217, 255, 0, 0.16)",
    borderHover: "rgba(217, 255, 0, 0.30)",
  },
] as const;

// ─── Shared animation variants ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ─── Feature card ─────────────────────────────────────────────────────────────

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.article
      id={`feature-${feature.id}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index * 0.1}
      variants={fadeUp}
      whileHover={{
        y: -8,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      style={
        {
          "--glow": feature.glowColor,
          "--border-hover": feature.borderHover,
        } as React.CSSProperties
      }
      className="feature-card group relative flex flex-col gap-5 rounded-2xl border border-white/8 bg-zinc-900/50 p-7 backdrop-blur-sm transition-all duration-200 hover:shadow-[0_20px_60px_var(--glow)]"
    >
      {/* top-edge gradient shimmer */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[1.4rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.borderHover}, transparent)`,
        }}
      />

      <motion.div
        whileHover={{ scale: 1.08, rotate: 4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ background: feature.iconBg }}
      >
        <Icon
          strokeWidth={1.6}
          className="h-7 w-7"
          style={{ color: feature.iconColor }}
        />
      </motion.div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-semibold text-[1rem] leading-snug tracking-[-0.025em] text-zinc-50">
          {feature.title}
        </h3>
        <p className="line-clamp-2 font-sans text-[0.85rem] leading-[1.65] text-zinc-400">
          {feature.description}
        </p>
      </div>

      <div
        className="mt-auto h-[2px] w-8 rounded-full opacity-0 transition-all duration-300 group-hover:w-14 group-hover:opacity-100"
        style={{ background: feature.iconColor }}
      />
    </motion.article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function FeaturesSection() {
  return (
    /*
     * NO solid background here — the fixed PageGradient shows through.
     * NO top fade-overlay — that was the cause of the hard cut.
     * Padding is tightened to bridge naturally from the hero stats strip.
     */
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14"
    >
      {/* ── Section header with stagger ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mb-12 flex flex-col gap-3"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#d7f209]/80"
        >
          Por qué Miunix
        </motion.p>

        <motion.h2
          id="features-heading"
          variants={fadeUp}
          custom={0.08}
          className="max-w-sm text-balance font-heading font-bold text-[1.9rem] leading-[1.1] tracking-[-0.045em] text-white sm:text-[2.3rem]"
        >
          Todo lo que necesitas,{" "}
          <span className="text-[#858BE3]">listo en minutos.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={0.16}
          className="max-w-2xl font-sans text-sm leading-7 text-zinc-400 sm:text-base"
        >
          Miunix combina descubrimiento, instalación y ejecución en una sola
          experiencia. Entras, eliges el agente correcto y lo pones a trabajar
          sin fricción.
        </motion.p>
      </motion.div>

      {/* ── Feature cards grid ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <FeatureCard key={feature.id} feature={feature} index={i} />
        ))}
      </div>

      {/* ── Bottom bento ── */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Flujo simple */}
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0}
          className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-6 py-6 backdrop-blur-sm"
        >
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/38">
            Flujo simple
          </p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">
            Elige el agente, instálalo y ejecútalo en el mismo lugar
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { n: "01", title: "Descubre",  body: "Encuentra el caso de uso correcto en marketplace." },
              { n: "02", title: "Instala",   body: "Activa el agente sin frenar al equipo con setup técnico." },
              { n: "03", title: "Ejecuta",   body: "Corre tareas reales y obtén respuesta en minutos." },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i * 0.1}
                className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-white/34">{step.n}</p>
                <p className="mt-2 text-sm font-medium text-white">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/55">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.article>

        {/* Ideal para */}
        <motion.article
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0.1}
          className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-6 py-6 backdrop-blur-sm"
        >
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-white/38">
            Ideal para
          </p>
          <div className="mt-4 space-y-3">
            {[
              "Equipos de soporte que quieren respuestas más rápidas y consistentes.",
              "Negocios que necesitan automatizar tareas sin depender de desarrollo.",
              "Usuarios premium que quieren crear agentes privados con MIUNIX+.",
            ].map((text, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i * 0.08}
                className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-white/65"
              >
                {text}
              </motion.div>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
