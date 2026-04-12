import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";

type MarketingPageShellProps = {
  currentPath: string;
  children: ReactNode;
};

export function MarketingPageShell({
  currentPath,
  children,
}: MarketingPageShellProps) {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex min-h-[calc(100vh-2.5rem)] flex-1 flex-col rounded-[2rem] border border-white/8 bg-[#080808] px-5 py-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:px-8 sm:py-7 lg:px-10 lg:py-8">
          <SiteHeader currentPath={currentPath} />
          {children}
        </div>
      </section>
    </main>
  );
}
