import Link from "next/link";

import { Button } from "@/components/ui/button";

type DeveloperMarketplaceCardProps = {
  name: string;
  role: string;
  description: string;
  avatar: React.ReactNode;
  href: string;
};

export function DeveloperMarketplaceCard({
  name,
  role,
  description,
  avatar,
  href,
}: DeveloperMarketplaceCardProps) {
  return (
    <article className="flex min-h-[26rem] flex-col items-center rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#8b8b90_0%,#5b5b72_62%,#43436d_100%)] px-6 pb-7 pt-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
      <div className="flex size-[4.6rem] items-center justify-center overflow-hidden rounded-full bg-[#08282c] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        {avatar}
      </div>

      <h2 className="mt-6 text-balance text-[2rem] font-medium leading-[0.92] tracking-[-0.05em] text-white">
        {name}
      </h2>

      <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/56">
        {role}
      </p>

      <p className="mt-5 max-w-[14rem] text-[0.7rem] leading-[1.55] text-white/88">
        {description}
      </p>

      <Button
        asChild
        className="mt-auto h-auto rounded-full border border-white/10 bg-white/20 px-5 py-3 text-[0.68rem] font-medium text-white backdrop-blur hover:bg-white/28"
      >
        <Link href={href}>Ver perfil</Link>
      </Button>
    </article>
  );
}
