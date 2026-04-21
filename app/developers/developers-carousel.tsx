"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { DeveloperMarketplaceCard } from "@/components/marketing/developer-marketplace-card";
import { CarouselPagination } from "@/components/shared/carousel-pagination";
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
      <div className="mt-12 w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid w-full gap-8 lg:grid-cols-3 lg:gap-16"
          >
            {visibleDevelopers.map((developer, i) => (
              <motion.div
                key={developer.profileId}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <DeveloperMarketplaceCard
                  name={developer.name}
                  role={developer.role}
                  description={developer.shortDescription}
                  initials={developer.initials}
                  approvedAgentCount={developer.approvedAgentCount}
                  href={`/developers/${developer.slug}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {developers.length > PAGE_SIZE ? (
        <CarouselPagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
        />
      ) : null}
    </>
  );
}
