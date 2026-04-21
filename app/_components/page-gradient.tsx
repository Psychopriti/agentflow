"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * PageGradient — sits fixed behind ALL page content.
 * The cursor moves two colour orbs (neon-lime + deep violet) across the full
 * viewport, so there's no visible cut between hero and features sections.
 */
export function PageGradient() {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springX = useSpring(rawX, { stiffness: 55, damping: 22, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 55, damping: 22, mass: 0.6 });

  // Primary orb follows the cursor
  const orbLeft = useTransform(springX, [0, 1], ["8%", "88%"]);
  const orbTop  = useTransform(springY, [0, 1], ["5%",  "85%"]);

  // Secondary orb moves in the opposite direction
  const orbLeft2 = useTransform(springX, [0, 1], ["82%", "18%"]);
  const orbTop2  = useTransform(springY, [0, 1], ["75%", "20%"]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    },
    [rawX, rawY],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    /* fixed = covers the entire viewport regardless of scroll position */
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Animated base gradient (dark green ↔ black ↔ violet cycle) */}
      <div className="hero-gradient-base absolute inset-0" />

      {/* Cursor-driven primary orb — neon yellow-green */}
      <motion.div
        style={{ left: orbLeft, top: orbTop }}
        className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,255,0,0.20)_0%,rgba(100,200,0,0.09)_45%,transparent_70%)] blur-[90px]"
      />

      {/* Cursor-driven secondary orb — deep violet */}
      <motion.div
        style={{ left: orbLeft2, top: orbTop2 }}
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,30,255,0.24)_0%,rgba(70,0,170,0.10)_45%,transparent_70%)] blur-[100px]"
      />

      {/* Static ambient orbs for baseline atmosphere */}
      <div className="absolute -top-32 left-1/2 h-[520px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(120,210,0,0.11)_0%,transparent_65%)] blur-[110px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(80,0,200,0.16)_0%,transparent_65%)] blur-[90px]" />
      <div className="absolute left-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(60,0,160,0.12)_0%,transparent_65%)] blur-[80px]" />

      {/* Film-grain texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
