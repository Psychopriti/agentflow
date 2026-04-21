import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type MarketingPageShellProps = {
  currentPath: string;
  children: ReactNode;
};

/**
 * MarketingPageShell — wrapper para páginas públicas de marketing
 * (Workflows, Developers, etc.).
 * Usa el mismo diseño sin card-wrapper que homepage y marketplace.
 */
export function MarketingPageShell({
  currentPath,
  children,
}: MarketingPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b] text-white">
      <SiteHeader currentPath={currentPath} />

      <main className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-5 sm:px-8">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
