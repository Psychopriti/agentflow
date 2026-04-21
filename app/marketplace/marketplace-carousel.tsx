"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { MarketplaceCard } from "@/components/marketing/marketplace-card";
import { CarouselPagination } from "@/components/shared/carousel-pagination";

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
            {visibleItems.map((agent, i) => (
              <motion.div
                key={agent.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <MarketplaceCard
                  title={agent.title}
                  description={agent.description}
                  ownerLabel={agent.ownerLabel}
                  variant={agent.variant}
                  href={`/marketplace/${agent.slug}`}
                  averageRating={agent.averageRating}
                  totalReviews={agent.totalReviews}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > PAGE_SIZE ? (
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
