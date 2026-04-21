"use client";

import { TextEffect } from "@/components/ui/text-effect";

export function DevelopersHeading() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#858BE3]/70">
        Comunidad
      </p>
      <TextEffect
        as="h1"
        per="word"
        preset="blur"
        delay={0.1}
        speedReveal={1.5}
        className="font-heading font-bold text-[2rem] leading-[1.05] tracking-[-0.05em] text-white sm:text-[3.2rem] lg:text-[3.8rem]"
      >
        Developers Destacados
      </TextEffect>
      <p className="mt-1 max-w-md font-sans text-base leading-7 text-zinc-400">
        Los mejores creadores de agentes en Miunix. Explora sus perfiles y activa sus soluciones.
      </p>
    </div>
  );
}
