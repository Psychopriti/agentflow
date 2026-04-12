"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DeveloperMarketplaceCard } from "@/components/marketing/developer-marketplace-card";
import type { DeveloperMarketplaceProfile } from "@/lib/developer-marketplace";

type DevelopersCarouselProps = {
  developers: DeveloperMarketplaceProfile[];
};

const PAGE_SIZE = 3;

export function DevelopersCarousel({ developers }: DevelopersCarouselProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(developers.length / PAGE_SIZE));

  const visibleDevelopers = useMemo(() => {
    const start = page * PAGE_SIZE;
    return developers.slice(start, start + PAGE_SIZE);
  }, [developers, page]);

  return (
    <>
      <div className="mt-12 grid w-full gap-8 lg:grid-cols-3 lg:gap-16">
        {visibleDevelopers.map((developer) => (
          <DeveloperMarketplaceCard
            key={developer.profileId}
            name={developer.name}
            role={developer.role}
            description={developer.shortDescription}
            initials={developer.initials}
            approvedAgentCount={developer.approvedAgentCount}
            href={`/developers/${developer.slug}`}
          />
        ))}
      </div>

      {developers.length > PAGE_SIZE ? (
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
