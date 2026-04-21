import Link from "next/link";

import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

type AuthSessionControlsProps = {
  isAuthenticated: boolean;
  isDeveloper?: boolean;
  isAdmin?: boolean;
  isPremiumUser?: boolean;
  shouldShowMiunixPlus?: boolean;
  currentPath?: string;
};

// ── Shared class strings ──────────────────────────────────────────────────────
// Active: neon bg, zinc-950 text (contrast ~14:1 ✅)
// Inactive: glass ghost, zinc-200 text (contrast ~7:1 ✅)
// CTA (login / signout): lila border + lila text on dark glass (contrast ~5:1 ✅)
const ACTIVE_BTN =
  "border-[#d7f209]/30 bg-[#d7f209] text-[#09090b] hover:bg-[#e5ff3a] hover:shadow-[0_0_14px_rgba(215,242,9,0.35)]";
const GHOST_BTN =
  "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 hover:text-white";
const CTA_BTN =
  "border-[#858BE3]/40 bg-zinc-800 text-[#858BE3] hover:bg-zinc-700 hover:border-[#858BE3]/70 hover:text-[#a8abf0] shadow-[0_0_12px_rgba(133,139,227,0.15)] hover:shadow-[0_0_20px_rgba(133,139,227,0.3)]";

const BASE =
  "h-auto rounded-full border px-3 py-2 font-sans text-[0.72rem] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60 sm:px-4 sm:py-2.5 sm:text-[0.74rem] min-h-[40px] inline-flex items-center";

export function AuthSessionControls({
  isAuthenticated,
  isDeveloper = false,
  isAdmin = false,
  isPremiumUser = false,
  shouldShowMiunixPlus = false,
  currentPath,
}: AuthSessionControlsProps) {
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        {isAdmin ? (
          <Button
            asChild
            className={`${BASE} ${currentPath === "/review-center" ? ACTIVE_BTN : GHOST_BTN}`}
          >
            <Link href="/review-center">Review Center</Link>
          </Button>
        ) : null}

        {isDeveloper && !isAdmin ? (
          <Button
            asChild
            className={`${BASE} ${currentPath === "/dev-center" ? ACTIVE_BTN : GHOST_BTN}`}
          >
            <Link href="/dev-center">Dev Center</Link>
          </Button>
        ) : null}

        {shouldShowMiunixPlus ? (
          <Button
            asChild
            className={`${BASE} ${
              currentPath === "/miunix-plus" || currentPath === "/miunix-plus-center"
                ? ACTIVE_BTN
                : GHOST_BTN
            }`}
          >
            <Link href={isPremiumUser ? "/miunix-plus-center" : "/miunix-plus"}>
              {isPremiumUser ? "MIUNIX+ Center" : "MIUNIX+"}
            </Link>
          </Button>
        ) : null}

        <form action={signOutAction}>
          <Button type="submit" className={`${BASE} ${CTA_BTN}`}>
            Cerrar sesión
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Button asChild className={`${BASE} ${CTA_BTN}`}>
      <Link href="/login">Iniciar sesión</Link>
    </Button>
  );
}
