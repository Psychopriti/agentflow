"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  PenTool,
  Search,
  Code2,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type Variant = "lead-generation" | "marketing-content" | "research" | "developer";

type MarketplaceCardProps = {
  title: string;
  description: string;
  ownerLabel: string;
  variant: Variant;
  href: string;
  averageRating: number;
  totalReviews: number;
};

// ─── Variant config ───────────────────────────────────────────────────────────
// Each variant defines: the Lucide icon, a glow gradient pair (same technique
// as DeveloperMarketplaceCard), and a label shown as a small tag.

const variantConfig: Record<
  Variant,
  {
    Icon: React.ElementType;
    avatarGradient: string;      // CSS gradient for the icon circle
    glowC1: string;
    glowC2: string;
    tag: string;
  }
> = {
  "lead-generation": {
    Icon: TrendingUp,
    avatarGradient: "linear-gradient(180deg,#d7f209 0%,#6b8510 100%)",
    glowC1: "#d7f209",
    glowC2: "#00cc88",
    tag: "Generación de Leads",
  },
  "marketing-content": {
    Icon: PenTool,
    avatarGradient: "linear-gradient(180deg,#858BE3 0%,#4c4fa9 100%)",
    glowC1: "#858BE3",
    glowC2: "#d7f209",
    tag: "Contenido & Marketing",
  },
  research: {
    Icon: Search,
    avatarGradient: "linear-gradient(180deg,#67e8f9 0%,#0891b2 100%)",
    glowC1: "#67e8f9",
    glowC2: "#858BE3",
    tag: "Research & Análisis",
  },
  developer: {
    Icon: Code2,
    avatarGradient: "linear-gradient(180deg,#858BE3 0%,#4c4fa9 100%)",
    glowC1: "#858BE3",
    glowC2: "#00e5ff",
    tag: "Desarrollo",
  },
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export function MarketplaceCard({
  title,
  description,
  ownerLabel,
  variant,
  href,
  averageRating,
  totalReviews,
}: MarketplaceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { Icon, avatarGradient, glowC1, glowC2, tag } = variantConfig[variant];

  // Animated border / halo gradient — identical technique to DeveloperMarketplaceCard
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(0deg, ${glowC1}, ${glowC2})`,
    backgroundSize: "100% 200%",
    backgroundPosition: "center center",
    animation: "card-border-shift 3s ease infinite alternate",
  };

  return (
    <div className="relative">
      {/* Animated gradient border (3 px) — appears on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[3px] rounded-[2rem]"
        style={{
          ...gradientStyle,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.45s ease",
        }}
      />

      {/* Large blurred halo — same glow aura as developer cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[3px] rounded-[2rem]"
        style={{
          ...gradientStyle,
          filter: "blur(130px)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* ── Main card body — same visual as DeveloperMarketplaceCard ── */}
      <motion.article
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="
          relative flex min-h-[22rem] flex-col items-center
          rounded-[calc(2rem-3px)]
          border border-white/10
          bg-[linear-gradient(180deg,#8b8b90_0%,#5b5b72_62%,#43436d_100%)]
          px-5 pb-6 pt-7 text-center
          shadow-[0_24px_60px_rgba(0,0,0,0.35)]
          sm:min-h-[26rem] sm:px-6 sm:pb-7 sm:pt-8
        "
      >
        {/* ── Icon circle (avatar equivalent) ── */}
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="flex size-[4.6rem] items-center justify-center rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          style={{ background: avatarGradient }}
        >
          <Icon className="size-6 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]" strokeWidth={1.8} />
        </motion.div>

        {/* ── Title ── */}
        <h2 className="mt-6 text-balance font-heading font-semibold text-[1.6rem] leading-[1.05] tracking-[-0.04em] text-white">
          {title}
        </h2>

        {/* ── Category tag ── */}
        <p className="mt-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/55">
          {tag}
        </p>

        {/* ── Description ── */}
        <p className="mt-4 max-w-[14rem] font-sans text-[0.72rem] leading-[1.6] text-white/80">
          {description}
        </p>

        {/* ── Owner + Rating ── */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-white/50">
            by {ownerLabel}
          </p>
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-sans text-[0.65rem] text-white/75">
            <Star className="size-3 fill-[#d7f209] text-[#d7f209]" strokeWidth={0} />
            <span>
              {totalReviews > 0
                ? `${averageRating.toFixed(1)} · ${totalReviews}`
                : "Nuevo"}
            </span>
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="mt-auto w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            asChild
            className="
              h-auto w-full rounded-full
              border border-white/10 bg-white/20
              px-5 py-3
              font-sans text-[0.72rem] font-semibold text-white
              backdrop-blur
              transition-all duration-200
              hover:bg-white/30 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)]
              focus-visible:ring-2 focus-visible:ring-white/40
              disabled:opacity-50
            "
          >
            <Link href={href}>Activar Agente</Link>
          </Button>
        </motion.div>
      </motion.article>
    </div>
  );
}
