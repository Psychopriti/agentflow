import Link from "next/link";
import { AuthSessionControls } from "@/components/auth/auth-session-controls";
import { getCurrentProfile, getCurrentUser, isPremiumUser } from "@/lib/auth";
import { HeaderClient } from "./header-client";

const navItems = [
  { label: "Inicio",      href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Workflows",   href: "/workflows" },
  { label: "Dashboard",   href: "/dashboard" },
  { label: "Developers",  href: "/developers" },
] as const;

type SiteHeaderProps = { currentPath?: string };

export async function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [user, profile] = await Promise.all([getCurrentUser(), getCurrentProfile()]);
  const isAdmin = profile?.role === "admin";
  const visibleItems = isAdmin ? [] : [...navItems];

  const authControls = (
    <AuthSessionControls
      isAuthenticated={Boolean(user)}
      isDeveloper={profile?.role === "developer"}
      isAdmin={isAdmin}
      isPremiumUser={isPremiumUser(profile)}
      shouldShowMiunixPlus={profile?.role === "user"}
      currentPath={currentPath}
    />
  );

  return (
    <HeaderClient
      currentPath={currentPath}
      visibleItems={visibleItems}
      authControls={authControls}
    />
  );
}
