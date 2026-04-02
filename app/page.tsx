import { MoveUpRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";

const agentLabels = [
  {
    label: "Implementacion de Campanas",
    className: "left-8 top-9 sm:left-12 sm:top-10",
  },
  {
    label: "Agente de Investigacion",
    className: "right-4 top-8 sm:right-6 sm:top-9",
  },
  {
    label: "Creacion de Contenido",
    className: "bottom-6 left-4 sm:bottom-7 sm:left-3",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex min-h-[calc(100vh-2.5rem)] flex-1 flex-col rounded-[2rem] border border-white/8 bg-[#080808] px-5 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:px-8 sm:py-7 lg:px-10 lg:py-8">
          <SiteHeader currentPath="/" />

          <div
            id="inicio"
            className="flex flex-1 flex-col justify-between gap-10 pb-4 pt-10 sm:pt-14"
          >
            <div className="space-y-8">
              <h1 className="max-w-5xl text-balance text-[2.4rem] font-medium leading-[0.98] tracking-[-0.065em] text-white sm:text-[3.8rem] lg:text-[4.9rem]">
                Instala agentes de IA en minutos, sin codigo
              </h1>

              <div className="relative mx-auto w-full max-w-[1040px] pt-10">
                <div className="absolute inset-x-0 bottom-0 h-[58%] rounded-[2rem] bg-[#d9ff00]" />

                <div className="relative mx-auto w-[92%] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#cab8a9] shadow-[0_35px_70px_rgba(0,0,0,0.35)]">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(66,44,30,0.15),rgba(255,255,255,0.08),rgba(97,58,34,0.18))]" />
                  <div className="absolute inset-y-0 left-0 w-[12%] bg-[linear-gradient(180deg,#bab6b0,#7d7066)]" />
                  <div className="absolute inset-y-0 left-[7.5%] w-[2.5%] bg-[linear-gradient(180deg,#87786d,#54483f)]" />
                  <div className="absolute left-[18%] top-[7%] h-[16%] w-[22%] rounded-md bg-[linear-gradient(180deg,#8b6845,#c2915e)] shadow-[0_10px_18px_rgba(0,0,0,0.16)]" />
                  <div className="absolute left-[47%] top-[8%] h-[7%] w-[11%] rounded-full bg-[#314538]/40 blur-xl" />
                  <div className="absolute right-[11%] top-[11%] h-[28%] w-[19%] rounded-[0.8rem] border border-[#a79083] bg-[linear-gradient(180deg,#f1e5db,#d3c0b0)]" />
                  <div className="absolute bottom-[13%] left-[19%] h-[22%] w-[22%] rounded-t-[0.8rem] bg-[linear-gradient(180deg,#7d5c3f,#53311f)]" />
                  <div className="absolute bottom-[15%] left-[25%] h-[16%] w-[12%] rounded-[0.6rem] bg-[linear-gradient(180deg,#d7d6d4,#8c8c8c)] shadow-[0_12px_20px_rgba(0,0,0,0.12)]" />
                  <div className="absolute bottom-[13%] right-[20%] h-[34%] w-[19%] rounded-[45%_45%_38%_38%] bg-[linear-gradient(180deg,#15403b,#08231f)]" />
                  <div className="absolute bottom-[10%] right-[14%] h-[36%] w-[10%] rounded-[40%] bg-[linear-gradient(180deg,#c18b60,#82552f)]" />
                  <div className="absolute bottom-[3%] right-[8%] h-[42%] w-[18%] rounded-t-[45%] rounded-b-[16%] bg-[linear-gradient(180deg,#bb885d,#774d2d)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_38%,rgba(255,255,255,0.38),transparent_18%),radial-gradient(circle_at_48%_22%,rgba(255,255,255,0.2),transparent_12%),radial-gradient(circle_at_63%_65%,rgba(0,0,0,0.18),transparent_22%)]" />

                  <div className="relative aspect-[16/8.3] w-full" />

                  {agentLabels.map((item) => (
                    <div
                      key={item.label}
                      className={`absolute ${item.className} rounded-full bg-[#8f90ff]/90 px-5 py-3 text-center text-xs font-light text-white shadow-[0_10px_26px_rgba(143,144,255,0.32)] sm:px-7 sm:text-sm`}
                    >
                      <span className="block max-w-[10rem] leading-tight sm:max-w-[12rem]">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <footer className="flex flex-col gap-6 pt-4 text-[#7f9d12] sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex gap-2">
                  <span className="h-12 w-[2px] origin-bottom -rotate-[16deg] bg-[#0b0b0b] shadow-[0_0_0_1px_rgba(127,157,18,0.18)]" />
                  <span className="mt-3 h-8 w-[2px] origin-bottom rotate-[12deg] bg-[#0b0b0b] shadow-[0_0_0_1px_rgba(127,157,18,0.18)]" />
                </div>
                <p className="font-heading text-[0.62rem] uppercase tracking-[0.18em] text-[#D7F205]">
                  Agent Flow.
                  <span className="ml-2 text-[#6b8510]">2026</span>
                </p>
              </div>

              <a
                id="explorar"
                href="#"
                className="inline-flex items-center gap-2 self-start rounded-full border border-[#222] px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-[#6b8510] transition hover:border-[#38451a] hover:text-[#99bf17] sm:self-auto"
              >
                All Rights Reserved
                <MoveUpRight className="size-3.5" />
              </a>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
