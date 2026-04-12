"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MarketplaceCard } from "@/components/marketing/marketplace-card";

export type MarketplaceCarouselItem = {
  slug: string;
  title: string;
  description: string;
  ownerLabel: string;
  averageRating: number;
  totalReviews: number;
  variant: "lead-generation" | "marketing-content" | "research" | "developer";
};

type MarketplaceCarouselProps = {
  items: MarketplaceCarouselItem[];
};

const PAGE_SIZE = 3;

export function MarketplaceCarousel({ items }: MarketplaceCarouselProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const visibleItems = useMemo(() => {
    const start = page * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  return (
    <>
      <div className="mt-12 grid w-full gap-8 lg:grid-cols-3 lg:gap-16">
        {visibleItems.map((agent) => (
          <MarketplaceCard
            key={agent.slug}
            title={agent.title}
            description={agent.description}
            ownerLabel={agent.ownerLabel}
            variant={agent.variant}
            href={`/marketplace/${agent.slug}`}
            averageRating={agent.averageRating}
            totalReviews={agent.totalReviews}
          />
        ))}
      </div>

      {items.length > PAGE_SIZE ? (
        <>
          <div className="mt-8 flex items-center gap-2 text-sm text-[#b891e9]">
            <span className="text-base">*</span>
            <span>
              Pagina {page + 1} de {totalPages}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
              className="flex size-9 items-center justify-center rounded-lg bg-white text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/25 disabled:text-white/40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() =>
                setPage((current) => Math.min(totalPages - 1, current + 1))
              }
              disabled={page >= totalPages - 1}
              className="flex size-9 items-center justify-center rounded-lg bg-[#e6f8ca] text-black transition hover:bg-[#f0ffdc] disabled:cursor-not-allowed disabled:bg-white/25 disabled:text-white/40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}
