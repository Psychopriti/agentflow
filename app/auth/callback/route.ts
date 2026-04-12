import { NextResponse } from "next/server";

import { ensureProfileForUser, getDefaultRouteForRole } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?message=Codigo invalido.", request.url),
    );
  }

  const supabase = await createServerSupabaseClient();
  const exchangeResult = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeResult.error) {
    return NextResponse.redirect(
      new URL(
        `/login?message=${encodeURIComponent(exchangeResult.error.message)}`,
        request.url,
      ),
    );
  }

  if (exchangeResult.data.user) {
    const profile = await ensureProfileForUser(exchangeResult.data.user);
    const safeNext =
      profile.role === "admin"
        ? "/review-center"
        : next === "/review-center"
          ? "/dashboard"
          : next;

    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return NextResponse.redirect(
    new URL(getDefaultRouteForRole("user"), request.url),
  );
}
