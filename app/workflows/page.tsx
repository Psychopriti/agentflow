import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/marketing-page-shell";
import { featuredAgents } from "@/lib/agents";

export const metadata: Metadata = {
  title: "Workflows",
  description: "Paquetes de workflows y agentes para necesidades concretas.",
};

export default function WorkflowsPage() {
  return (
    <MarketingPageShell currentPath="/workflows">
      <section className="relative flex flex-1 flex-col items-center overflow-hidden pb-12 pt-10 sm:pt-14">
        <div className="absolute left-1/2 top-28 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-[#d7f205]/18 blur-[110px]" />
        <div className="absolute left-1/2 top-16 h-[24rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#8f90ff]/10 blur-[140px]" />

        <div className="relative flex w-full max-w-[1080px] flex-col items-center">
          <div className="max-w-[56rem] text-center">
            <h1 className="text-balance font-heading text-[2.55rem] uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-[4.4rem]">
              Workflows que se adaptan a tus necesidades
            </h1>
            <p className="mx-auto mt-5 max-w-[48rem] text-balance text-[1.05rem] leading-8 text-white/88 sm:text-[1.15rem]">
              Prueba nuestro paquete de 3 agentes por 10 $/mes,
              <br className="hidden sm:block" />o descubre agentes individuales{" "}
              <Link href="/marketplace" className="text-[#d7f205] underline">
                aqui
              </Link>
            </p>
          </div>

          <article className="mt-12 flex w-full max-w-[980px] flex-col gap-8 rounded-[1.8rem] border border-white/12 bg-[linear-gradient(180deg,rgba(63,63,63,0.92),rgba(48,48,48,0.92))] px-7 py-7 shadow-[0_30px_90px_rgba(0,0,0,0.4)] lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[18rem]">
              <h2 className="text-[3rem] font-light leading-none text-white">
                <span className="text-[#d7f205]">Tri</span>-Package
              </h2>
              <p className="mt-4 text-[1rem] leading-8 text-white/92 sm:text-[1.1rem]">
                Obten acceso completo a tres agentes expertos para ejecutar tu workflow
              </p>
            </div>

            <div className="grid flex-1 gap-6 sm:grid-cols-3">
              {featuredAgents.map((agent) => (
                <div key={agent.title} className="flex flex-col items-center text-center">
                  <div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-[#08282c] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    {agent.icon}
                  </div>
                  <p className="mt-3 max-w-[8rem] text-[0.8rem] leading-4 text-white/88 underline decoration-white/18 underline-offset-3">
                    {agent.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-center">
              <p className="text-[3rem] font-light leading-none text-[#d7f205]">
                $10/mo
              </p>
              <Link
                href="/register"
                className="inline-flex rounded-full border border-white/12 bg-white/22 px-6 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition hover:bg-white/28"
              >
                Obtener
              </Link>
            </div>
          </article>

          <Link
            href="/marketplace"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[linear-gradient(180deg,#353535,#232323)] px-6 py-3 text-[0.7rem] text-[#d7f205] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-[linear-gradient(180deg,#414141,#292929)]"
          >
            Descubrir Agentes
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </MarketingPageShell>
  );
}
