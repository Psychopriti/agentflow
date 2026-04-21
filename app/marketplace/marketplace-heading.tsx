"use client";

import { TextEffect } from "@/components/ui/text-effect";

export function MarketplaceHeading() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#d7f209]/70">
        Catálogo
      </p>
      <TextEffect
        as="h1"
        per="word"
        preset="blur"
        delay={0.1}
        speedReveal={1.5}
        className="font-heading font-bold text-[2.4rem] leading-[1.05] tracking-[-0.05em] text-white sm:text-[3.8rem]"
      >
        Agentes Destacados
      </TextEffect>
      <p className="mt-1 max-w-md font-sans text-base leading-7 text-zinc-400">
        Explora, instala y activa agentes listos para transformar tu negocio.
      </p>
    </div>
  );
}
