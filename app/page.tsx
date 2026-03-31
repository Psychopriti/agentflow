import { FeatureCard } from "@/components/marketing/feature-card";
import { SectionTitle } from "@/components/marketing/section-title";
import {
  agentFlowHighlights,
  siteConfig,
  starterChecklist,
} from "@/lib/site";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center gap-16 px-6 py-20 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200">
              Next.js 16 + React 19 + Tailwind CSS 4
            </span>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {siteConfig.name} comienza con una base limpia y lista para
                evolucionar.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Esta plantilla deja preparado el punto de partida para construir
                un dashboard, panel operativo o experiencia web centrada en
                flujos de agentes sin tocar la configuracion actual del
                proyecto.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#estructura"
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Ver estructura base
              </a>
              <a
                href="#siguientes-pasos"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Revisar siguientes pasos
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                Starter status
              </p>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
                  <span>TypeScript</span>
                  <span className="font-semibold text-white">Activo</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
                  <span>App Router</span>
                  <span className="font-semibold text-white">Listo</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
                  <span>Tailwind CSS</span>
                  <span className="font-semibold text-white">Integrado</span>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/5 px-4 py-3">
                  <span>README inicial</span>
                  <span className="font-semibold text-white">Actualizado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="estructura" className="space-y-6">
          <SectionTitle
            eyebrow="Estructura base"
            title="Una organizacion inicial para construir AgentFlow sin friccion."
            description="Separamos contenido, UI reutilizable y configuracion compartida para que el siguiente paso sea agregar features, no limpiar el starter."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {agentFlowHighlights.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section id="siguientes-pasos" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <SectionTitle
              eyebrow="Siguientes pasos"
              title="Checklist sugerido para empezar a construir el producto."
              description="La idea es dejar una base neutra y ordenada para que puedas especializarla segun el dominio del proyecto."
            />
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            {starterChecklist.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 font-semibold text-slate-950">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
