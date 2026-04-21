import Link from "next/link";
import { AuthSessionControls } from "@/components/auth/auth-session-controls";
import { getCurrentProfile, getCurrentUser, isPremiumUser } from "@/lib/auth";

const navItems = [
  { label: "Inicio",       href: "/" },
  { label: "Marketplace",  href: "/marketplace" },
  { label: "Workflows",    href: "/workflows" },
  { label: "Dashboard",    href: "/dashboard" },
  { label: "Developers",   href: "/developers" },
];

type SiteHeaderProps = {
  currentPath?: string;
};

export async function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [user, profile] = await Promise.all([
    getCurrentUser(),
    getCurrentProfile(),
  ]);
  const isAdmin = profile?.role === "admin";
  const visibleNavItems = isAdmin ? [] : navItems;

  return (
    <header
      className="
        sticky top-0 z-50
        glass                          /* backdrop-blur-md + bg zinc-950/75 + border-b */
        border-b border-white/6
        px-5 py-0 sm:px-8
        transition-all duration-200
      "
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="
            shrink-0
            font-heading font-bold text-[1.45rem] uppercase tracking-[-0.05em]
            text-[#d7f209]
            transition-opacity duration-200 hover:opacity-80
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60 focus-visible:rounded-sm
          "
        >
          Miunix
        </Link>

        {/* ── Nav pill bar (center) ── */}
        <nav className="flex flex-1 justify-center" aria-label="Navegación principal">
          {visibleNavItems.length > 0 ? (
            <ul className="flex items-center gap-1 rounded-full border border-white/8 bg-zinc-900/60 px-2 py-1.5 backdrop-blur-sm">
              {visibleNavItems.map((item) => {
                const isActive = item.href === currentPath;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`
                        inline-flex min-h-[36px] min-w-[44px] items-center justify-center
                        rounded-full px-4 py-1.5
                        text-xs font-medium tracking-wide
                        transition-all duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#858BE3]/60
                        ${
                          isActive
                            ? "bg-[#858BE3] text-white shadow-[0_0_14px_rgba(133,139,227,0.35)]"
                            : "text-zinc-400 hover:bg-white/8 hover:text-zinc-100"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div aria-hidden />
          )}
        </nav>

        {/* ── Auth controls ── */}
        <div className="shrink-0">
          <AuthSessionControls
            isAuthenticated={Boolean(user)}
            isDeveloper={profile?.role === "developer"}
            isAdmin={isAdmin}
            isPremiumUser={isPremiumUser(profile)}
            shouldShowMiunixPlus={profile?.role === "user"}
            currentPath={currentPath}
          />
        </div>
      </div>
    </header>
  );
}
