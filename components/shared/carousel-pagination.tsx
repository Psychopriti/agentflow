"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ─── Shared pagination controls ──────────────────────────────────────────────

const BTN_BASE =
  "flex size-11 items-center justify-center rounded-full border transition-all duration-200 font-sans text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60";

const BTN_ACTIVE =
  "border-white/10 bg-zinc-800 text-zinc-100 hover:border-[#858BE3]/40 hover:bg-zinc-700 hover:shadow-[0_0_12px_rgba(133,139,227,0.25)]";

const BTN_DISABLED =
  "border-white/6 bg-zinc-900/40 text-zinc-600 cursor-not-allowed opacity-50";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselPagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  const isPrevDisabled = page === 0;
  const isNextDisabled = page >= totalPages - 1;

  return (
    <div className="mt-8 flex flex-col items-start gap-4">
      {/* Page counter */}
      <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        Página{" "}
        <span className="text-zinc-300">{page + 1}</span>{" "}
        de{" "}
        <span className="text-zinc-300">{totalPages}</span>
      </p>

      {/* Prev / Next buttons */}
      <div className="flex items-center gap-3">
        <motion.button
          type="button"
          aria-label="Página anterior"
          onClick={onPrev}
          disabled={isPrevDisabled}
          whileHover={isPrevDisabled ? {} : { scale: 1.06 }}
          whileTap={isPrevDisabled ? {} : { scale: 0.94 }}
          className={`${BTN_BASE} ${isPrevDisabled ? BTN_DISABLED : BTN_ACTIVE}`}
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Página siguiente"
          onClick={onNext}
          disabled={isNextDisabled}
          whileHover={isNextDisabled ? {} : { scale: 1.06 }}
          whileTap={isNextDisabled ? {} : { scale: 0.94 }}
          className={`${BTN_BASE} ${isNextDisabled ? BTN_DISABLED : BTN_ACTIVE}`}
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </motion.button>
      </div>
    </div>
  );
}
