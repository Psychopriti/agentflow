import { listAgents } from "@/ai/agent-runner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getAgentBySlug } from "@/lib/agents";
import { InView } from "@/components/ui/in-view";
import { MarketplaceHeading } from "./marketplace-heading";
import { MarketplaceCarousel } from "./marketplace-carousel";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function MarketplacePage() {
  const publishedAgents = await listAgents();
  const marketplaceItems = publishedAgents.map((agent) => {
    const builtInAgent = getAgentBySlug(agent.slug);

    return {
      slug: agent.slug,
      title: builtInAgent?.title ?? agent.name,
      description:
        agent.short_description ??
        builtInAgent?.shortDescription ??
        "Agente publicado en Miunix.",
      ownerLabel: agent.ownerLabel,
      averageRating: Number(agent.average_rating),
      totalReviews: agent.total_reviews,
      variant: (builtInAgent?.slug ?? "developer") as
        | "lead-generation"
        | "marketing-content"
        | "research"
        | "developer",
    };
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#09090b] text-white">
      <SiteHeader currentPath="/marketplace" />

      <main className="relative z-10 flex flex-1 flex-col">
        <section
          className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-20"
          aria-label="Catálogo de agentes"
        >
          <MarketplaceHeading />

          {marketplaceItems.length === 0 ? (
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
                  <ShoppingBag className="size-7 text-zinc-500" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <p className="font-heading font-semibold text-lg text-zinc-50">
                    Aún no hay agentes disponibles
                  </p>
                  <p className="max-w-xs font-sans text-sm leading-6 text-zinc-400">
                    Estamos preparando el catálogo. Vuelve pronto para descubrir agentes que transformarán tu negocio.
                  </p>
                </div>
                <Link
                  href="/"
                  className="
                    inline-flex items-center gap-2 rounded-full bg-[#d7f209]
                    px-5 py-2.5 font-sans text-sm font-semibold text-[#09090b]
                    transition-all duration-200 hover:shadow-[0_0_20px_rgba(215,242,9,0.4)]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d7f209]/60
                  "
                >
                  Volver al inicio
                </Link>
              </div>
            </InView>
          ) : (
            <MarketplaceCarousel items={marketplaceItems} />
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
