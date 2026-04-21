import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { listMarketplaceDevelopers } from "@/lib/developer-marketplace";
import { DevelopersHeading } from "./developers-heading";
import { DevelopersCarousel } from "./developers-carousel";
import { Users } from "lucide-react";
import Link from "next/link";
import { InView } from "@/components/ui/in-view";

export default async function DevelopersPage() {
  const developers = await listMarketplaceDevelopers();

  return (
    <div className="flex min-h-screen flex-col bg-[#09090b] text-white">
      <SiteHeader currentPath="/developers" />

      <main className="relative z-10 flex flex-1 flex-col">
        <section
          className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center px-5 pb-16 pt-14 sm:px-8 sm:pt-20"
          aria-label="Directorio de developers"
        >
          <DevelopersHeading />

          {developers.length === 0 ? (
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewOptions={{ once: true }}
            >
              {/* ── Empty state ── */}
              <div className="mt-16 flex flex-col items-center gap-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl border border-white/8 bg-zinc-900">
                  <Users className="size-7 text-zinc-500" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <p className="font-heading font-semibold text-lg text-zinc-50">
                    Aún no hay developers publicados
                  </p>
                  <p className="max-w-xs font-sans text-sm leading-6 text-zinc-400">
                    Pronto encontrarás aquí a los mejores creadores de agentes de Miunix.
                  </p>
                </div>
                <Link
                  href="/marketplace"
                  className="
                    inline-flex items-center gap-2 rounded-full bg-[#d7f209]
                    px-5 py-2.5 font-sans text-sm font-semibold text-[#09090b]
                    transition-all duration-200 hover:shadow-[0_0_20px_rgba(215,242,9,0.4)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7f209]/60
                  "
                >
                  Explorar marketplace
                </Link>
              </div>
            </InView>
          ) : (
            <DevelopersCarousel developers={developers} />
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
