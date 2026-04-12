import Link from "next/link";
import { Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type MarketplaceCardProps = {
  title: string;
  description: string;
  ownerLabel: string;
  variant: "lead-generation" | "marketing-content" | "research" | "developer";
  href: string;
  averageRating: number;
  totalReviews: number;
};

function MarketplaceCardIcon({
  variant,
}: {
  variant: MarketplaceCardProps["variant"];
}) {
  if (variant === "lead-generation") {
    return (
      <div className="relative h-10 w-10">
        <div className="absolute left-0 top-1 h-8 w-4 bg-[linear-gradient(180deg,#3bc7dd,#173580)]" />
        <div className="absolute left-4 top-3 h-5 w-5 border border-white/60 bg-transparent" />
        <div className="absolute left-1 top-5 h-2 w-8 bg-[linear-gradient(90deg,#072b30,#6ee0bf)]" />
      </div>
    );
  }

  if (variant === "marketing-content") {
    return (
      <div className="relative h-10 w-10">
        <div className="absolute inset-x-1 top-1 h-4 rotate-[1deg] bg-[linear-gradient(180deg,#f3dd8c,#689a84)] [clip-path:polygon(50%_0%,100%_52%,50%_100%,0%_52%)]" />
        <div className="absolute inset-x-1 top-4 h-4 bg-[linear-gradient(180deg,#24494b,#7dd5b2)] [clip-path:polygon(50%_0%,100%_52%,50%_100%,0%_52%)] opacity-90" />
        <div className="absolute inset-x-2 top-7 h-2 border border-white/50 [clip-path:polygon(50%_0%,100%_52%,50%_100%,0%_52%)]" />
      </div>
    );
  }

  if (variant === "research") {
    return (
      <div className="relative h-10 w-10">
        <div className="absolute left-2 top-0 h-6 w-6 rotate-45 border border-white/80" />
        <div className="absolute bottom-1 left-0 h-4 w-5 bg-[#f04e37]" />
        <div className="absolute bottom-1 right-0 h-4 w-5 bg-[linear-gradient(90deg,#0f6d63,#1fd7bd)]" />
      </div>
    );
  }

  return <Sparkles className="size-5 text-[#d9ff00]" />;
}

export function MarketplaceCard({
  title,
  description,
  ownerLabel,
  variant,
  href,
  averageRating,
  totalReviews,
}: MarketplaceCardProps) {
  return (
    <article className="flex min-h-[26rem] flex-col items-center rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#8b8b90_0%,#5b5b72_62%,#43436d_100%)] px-6 pb-7 pt-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
      <div className="flex size-[4.6rem] items-center justify-center rounded-full bg-[#08282c] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        <MarketplaceCardIcon variant={variant} />
      </div>

      <h2 className="mt-6 text-balance text-[2rem] font-medium leading-[0.92] tracking-[-0.05em] text-white">
        {title}
      </h2>

      <p className="mt-5 max-w-[14rem] text-[0.7rem] leading-[1.55] text-white/88">
        {description}
      </p>

      <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-white/58">
        by {ownerLabel}
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-3 py-1.5 text-xs text-white/78">
        <Star className="size-3.5 fill-[#d9ff00] text-[#d9ff00]" />
        <span>
          {totalReviews > 0
            ? `${averageRating.toFixed(1)} · ${totalReviews} review${totalReviews === 1 ? "" : "s"}`
            : "Sin reviews"}
        </span>
      </div>

      <Button
        asChild
        className="mt-auto h-auto rounded-full border border-white/10 bg-white/20 px-5 py-3 text-[0.68rem] font-medium text-white backdrop-blur hover:bg-white/28"
      >
        <Link href={href}>Try for Free</Link>
      </Button>
    </article>
  );
}
